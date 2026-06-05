import { webcrypto } from 'crypto';

// Node 18+ exposes webcrypto as a SubtleCrypto-compatible object
const subtleCrypto = webcrypto.subtle;

/**
 * Encrypts a JSON-serialisable payload using AES-GCM.
 *
 * The session key comes from the client's `X-Session-Key` header.
 * Key is truncated / padded to 32 bytes (256-bit AES).
 *
 * Returns `{ iv: string, data: string }` encoded as Base64.
 * Using Base64 instead of `Array.from` prevents massive memory allocation
 * and huge payload sizes during JSON serialization.
 */
export async function encryptPayload(
  data: unknown,
  sessionKey: string,
): Promise<{ iv: string; data: string }> {
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const keyData = encoder.encode(sessionKey.slice(0, 32).padEnd(32, '0'));

  const cryptoKey = await subtleCrypto.importKey('raw', keyData, { name: 'AES-GCM' }, false, [
    'encrypt',
  ]);

  const ciphertext = await subtleCrypto.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encoder.encode(JSON.stringify(data)),
  );

  return {
    iv: Buffer.from(iv).toString('base64'),
    data: Buffer.from(ciphertext).toString('base64'),
  };
}
