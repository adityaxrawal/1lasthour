/**
 * Heuristic headless-browser detection.
 * Runs entirely client-side — supplements the server-side UA filter
 * already in the Fastify rejectBots middleware.
 */

/**
 * Returns true if the current browser session appears automated.
 * @returns {Promise<boolean>}
 */
export async function isHeadlessBrowser() {
  // 1. WebDriver flag — set by all Selenium / Puppeteer / Playwright sessions
  if (navigator.webdriver) return true

  // 2. PhantomJS globals
  if ('callPhantom' in window || '_phantom' in window) return true

  // 3. Empty plugins array — headless Chrome ships with none
  if (navigator.plugins.length === 0) return true

  // 4. No languages configured
  if (!navigator.languages || navigator.languages.length === 0) return true

  // 5. Zero-dimension screen — some headless configs expose this
  if (screen.width === 0 || screen.height === 0) return true

  // 6. Real Chrome always has window.chrome.runtime; headless often lacks it
  if (
    /chrome/i.test(navigator.userAgent) &&
    !(/** @type {any} */ (window).chrome?.runtime)
  ) return true

  // 7. Permissions API anomaly — headless environments return inconsistent state
  try {
    const perm = await navigator.permissions.query({ name: 'notifications' })
    if (perm.state === 'denied' && Notification.permission === 'default') return true
  }  
    catch (e) { // eslint-disable-line no-unused-vars
    // Some browsers don't support the Permissions API — not itself a bot signal
  }

  return false
}

/**
 * Call once at app root. If a bot is detected, the page is blanked
 * and a permanent error is thrown (React will not continue rendering).
 * @returns {Promise<void>}
 */
export async function enforceHumanBrowser() {
  const isBot = await isHeadlessBrowser()
  if (isBot) {
    document.body.innerHTML = ''
    document.title          = ''
    throw new Error('[1lasthour] Automated access is not permitted.')
  }
}
