/**
 * Signed + encrypted fetch client for 1lasthour CFA API endpoints.
 *
 * Flow:
 *  1. First call → GET /api/v1/session/init → receive { sessionId, signature, expiresAt }
 *  2. For each request → compute HMAC-SHA256 over (sessionId + nonce + timestamp + path)
 *     using the `signature` returned from /init as the HMAC key.
 *  3. Send session headers: X-Session-Id, X-Nonce, X-Timestamp, X-Request-Signature
 *  4. If backend returns encrypted envelope { iv, data } → decrypt with AES-GCM using sessionKey.
 *  5. On 401 → invalidate cached session and retry once with a fresh session.
 */

const API_ORIGIN = (() => {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (!base) return '';
  try {
    const url = new URL(base, window.location.origin);
    if (url.hostname === 'localhost' && window.location.hostname !== 'localhost') {
      url.hostname = window.location.hostname;
    }
    return url.origin;
  } catch {
    return '';
  }
})();

// ── Session key — stable per page load for AES-GCM decryption ─────────────────
let _sessionKey = null;

function getSessionKey() {
  if (!_sessionKey) {
    // In non-secure contexts, we can't encrypt/decrypt using subtle crypto
    if (!window.crypto || !window.crypto.subtle) return null;
    
    // Generate a 64-char hex key (256-bit)
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    _sessionKey = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  return _sessionKey;
}

// ── Session cache ──────────────────────────────────────────────────────────────
let _sessionInfo = null;
let _initPromise = null;

/**
 * Calls GET /api/v1/session/init to acquire sessionId + signing secret.
 * Caches the result until the session expires, then auto-refreshes.
 */
async function initSession() {
  // Always send standard browser headers; do NOT use credentials:omit
  // so that User-Agent and Accept-Language headers are included (needed for fingerprint).
  const url = `${API_ORIGIN}/api/v1/session/init`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Session init failed: ${response.status}`);
  }
  return response.json();
}

async function getSessionInfo() {
  // Return cached session if still valid (with 5s buffer before expiry)
  if (_sessionInfo && _sessionInfo.expiresAt > Date.now() + 5000) {
    return _sessionInfo;
  }
  // Deduplicate concurrent calls
  if (_initPromise) {
    return _initPromise;
  }
  _initPromise = initSession()
    .then(data => {
      _sessionInfo = data;
      _initPromise = null;
      return _sessionInfo;
    })
    .catch(err => {
      _initPromise = null;
      throw err;
    });
  return _initPromise;
}

function invalidateSession() {
  _sessionInfo = null;
  _initPromise = null;
}

// ── HMAC-SHA256 signing ────────────────────────────────────────────────────────

/**
 * Signs the canonical message using the session-specific secret returned from /init.
 *
 * Message format: sessionId + nonce + timestamp + requestPath
 * Mirrors backend verifyBrowserSession.ts line 120:
 *   `${sessionId}${nonce}${timestamp}${req.url}`
 */
async function signRequest(sessionId, nonce, timestamp, path, secret) {
  if (!window.crypto || !window.crypto.subtle) {
    // Fallback for non-secure contexts (e.g. mobile testing on LAN)
    return 'dev-bypass';
  }
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const message = `${sessionId}${nonce}${timestamp}${path}`;
  const buf = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ── AES-GCM decryption ────────────────────────────────────────────────────────

function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Decrypts an envelope produced by the backend encryptPayload() utility.
 * The backend derives the AES key from the raw X-Session-Key header bytes.
 */
async function decryptPayload(envelope, sessionKey) {
  // Backend uses first 32 bytes of the raw session key string as AES key material
  const keyBytes = new TextEncoder().encode(sessionKey.slice(0, 32).padEnd(32, '0'));
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['decrypt']);
  // Support both legacy array format and new base64 format for rolling updates
  const iv = Array.isArray(envelope.iv) ? new Uint8Array(envelope.iv) : base64ToUint8Array(envelope.iv);
  const data = Array.isArray(envelope.data) ? new Uint8Array(envelope.data) : base64ToUint8Array(envelope.data);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
  return JSON.parse(new TextDecoder().decode(plain));
}

// ── URL normalization ────────────────────────────────────────────────────────

/**
 * Normalise a path so that any special characters are percent-encoded
 * exactly the way the browser's fetch() API will encode them on the wire.
 *
 * By the time paths reach here, invisible Unicode chars (U+200B etc.) have
 * already been stripped by cleanId() in cfaApi.js. This function exists solely
 * to ensure the signed canonical path matches req.url on the backend.
 */
function normalizePath(path) {
  try {
    const u = new URL('http://x' + path);
    return u.pathname + u.search;
  } catch {
    return path; // fallback: sign as-is
  }
}

// ── Core signed fetch ─────────────────────────────────────────────────────────

async function _doFetch(path, sessionInfo) {
  const nonce = window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
  const timestamp = Date.now().toString();
  const sessionKey = getSessionKey();

  // IMPORTANT: normalise before signing — must match req.url on the backend
  const normalizedPath = normalizePath(path);

  const sig = await signRequest(sessionInfo.sessionId, nonce, timestamp, normalizedPath, sessionInfo.signature);

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Session-Id': sessionInfo.sessionId,
    'X-Nonce': nonce,
    'X-Timestamp': timestamp,
    'X-Request-Signature': sig,
    'X-Requested-With': 'XMLHttpRequest',
  };

  if (sessionKey) {
    headers['X-Session-Key'] = sessionKey;
  }

  const url = `${API_ORIGIN}${path}`; // browser will encode this itself
  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  return { response, sessionKey };
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Authenticated fetch for all CFA API endpoints.
 *
 * @param {string} path  Full API path, e.g. '/api/v1/topics?level=1'
 * @returns {Promise<any>}
 */
export async function signedFetch(path) {
  let sessionInfo = await getSessionInfo();
  let { response, sessionKey } = await _doFetch(path, sessionInfo);

  // On 401 the session may have expired — get a fresh one and retry once
  if (response.status === 401) {
    invalidateSession();
    sessionInfo = await getSessionInfo();
    ({ response, sessionKey } = await _doFetch(path, sessionInfo));
  }

  if (!response.ok) {
    const body = await response.text().catch(() => response.statusText);
    throw new Error(`API ${response.status}: ${body}`);
  }

  if (response.status === 204) return null;

  const payload = await response.json();

  // Transparently decrypt AES-GCM encrypted responses
  if (payload !== null && typeof payload === 'object' && 'iv' in payload && 'data' in payload) {
    return decryptPayload(payload, sessionKey);
  }

  return payload;
}
