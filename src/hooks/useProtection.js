import { useEffect } from 'react'

/**
 * Applies multi-layer browser-side content protection.
 *
 * CSS-SAFE: All `user-select`, `user-drag`, and print styles are injected
 * programmatically via a <style> tag and inline style properties.
 * Zero modifications to any existing stylesheet.
 *
 * Call once at your root component (App.jsx).
 */
export function useProtection() {
  useEffect(() => {
    // ── 1. Inject protection styles (does NOT touch index.css) ───────────────
    const styleTag = document.createElement('style')
    styleTag.id    = '__1lh_protection__'
    styleTag.textContent = `
      /* 1lasthour content protection — injected at runtime, not in any CSS file */

      /* Disable drag on media and interactive elements */
      img, canvas, svg, video, audio {
        -webkit-user-drag: none !important;
        user-drag:         none !important;
      }

      /* Print: replace all content with a block message */
      @media print {
        body > * { display: none !important; }
        body::after {
          content:     'This content is protected and cannot be printed.';
          display:     block !important;
          text-align:  center;
          margin-top:  40vh;
          font-size:   24px;
          font-family: sans-serif;
        }
      }
    `
    document.head.appendChild(styleTag)

    // ── 2. Body-level inline styles (reversible on cleanup) ──────────────────
    const body = document.body
    const prevUserSelect       = body.style.userSelect
    const prevWebkitUserSelect = body.style.webkitUserSelect
    const prevTouchCallout     = body.style.webkitTouchCallout
    const prevTapHighlight     = body.style.webkitTapHighlightColor

    body.style.userSelect              = 'none'
    body.style.webkitUserSelect        = 'none'
    body.style.webkitTouchCallout      = 'none'
    body.style.webkitTapHighlightColor = 'transparent'

    // ── 3. Right-click block ──────────────────────────────────────────────────
    const blockContextMenu = (e) => e.preventDefault()

    // ── 4. Clipboard block (copy / cut) ──────────────────────────────────────
    const blockClipboard = (e) => e.preventDefault()

    // ── 5. Drag block ─────────────────────────────────────────────────────────
    const blockDrag = (e) => e.preventDefault()

    // ── 6. Text-selection block ───────────────────────────────────────────────
    const blockSelect = (e) => e.preventDefault()

    // ── 7. Keyboard shortcut block ────────────────────────────────────────────
    const blockKeys = (e) => {
      const ctrl = e.ctrlKey || e.metaKey
      const blocked = [
        ctrl && e.key === 'a',                       // Select All
        ctrl && e.key === 'c',                       // Copy
        ctrl && e.key === 'x',                       // Cut
        ctrl && e.key === 's',                       // Save Page
        ctrl && e.key === 'u',                       // View Source
        ctrl && e.key === 'p',                       // Print
        ctrl && e.key === 'j',                       // Downloads
        e.key === 'F12',                             // DevTools
        ctrl && e.shiftKey && e.key === 'I',         // DevTools (alt)
        ctrl && e.shiftKey && e.key === 'J',         // Console
        ctrl && e.shiftKey && e.key === 'C',         // Inspector
      ]
      if (blocked.some(Boolean)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // ── 8. Print intercept (JS layer — supplements the @media print CSS) ──────
    let _printOriginal = null
    const blockPrint = () => {
      _printOriginal = document.body.innerHTML
      document.body.innerHTML =
        '<h1 style="margin-top:40vh;text-align:center;font-family:sans-serif;' +
        'user-select:none">Printing is disabled.</h1>'
    }
    const restoreAfterPrint = () => {
      if (_printOriginal !== null) {
        document.body.innerHTML = _printOriginal
        _printOriginal = null
      }
    }

    // ── 9. DevTools size-detection (Chrome / Edge) ────────────────────────────
    let devToolsOpen    = false
    let _prevBodyFilter = ''

    const checkDevTools = () => {
      // Skip DevTools check on mobile devices to prevent false positives from address bar changes
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        return
      }

      const threshold = 160
      const isOpen =
        window.outerWidth  - window.innerWidth  > threshold ||
        window.outerHeight - window.innerHeight > threshold

      if (isOpen !== devToolsOpen) {
        devToolsOpen = isOpen
        if (isOpen) {
          _prevBodyFilter          = document.body.style.filter
          document.body.style.filter = 'blur(8px)'
        } else {
          document.body.style.filter = _prevBodyFilter
        }
      }
    }

    const devToolsInterval = setInterval(checkDevTools, 1_000)

    // ── 10. Console warning ───────────────────────────────────────────────────
    /* eslint-disable no-console */
    console.log('%c⛔ STOP', 'color:red;font-size:32px;font-weight:bold;')
    console.log(
      '%cThis is a browser developer console. All access to this platform is ' +
      'logged and session-watermarked. Unauthorised extraction of content ' +
      'violates our Terms of Service and applicable copyright law.',
      'color:#333;font-size:15px;'
    )
    /* eslint-enable no-console */

    // ── Attach listeners ──────────────────────────────────────────────────────
    document.addEventListener('contextmenu',  blockContextMenu)
    document.addEventListener('copy',         blockClipboard)
    document.addEventListener('cut',          blockClipboard)
    document.addEventListener('dragstart',    blockDrag)
    document.addEventListener('selectstart',  blockSelect)
    document.addEventListener('keydown',      blockKeys)
    window.addEventListener('resize',         checkDevTools)
    window.addEventListener('beforeprint',    blockPrint)
    window.addEventListener('afterprint',     restoreAfterPrint)

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      // Remove injected style tag
      const tag = document.getElementById('__1lh_protection__')
      if (tag) tag.remove()

      // Restore body inline styles to whatever they were before
      body.style.userSelect              = prevUserSelect
      body.style.webkitUserSelect        = prevWebkitUserSelect
      body.style.webkitTouchCallout      = prevTouchCallout
      body.style.webkitTapHighlightColor = prevTapHighlight

      // Remove listeners
      document.removeEventListener('contextmenu', blockContextMenu)
      document.removeEventListener('copy',        blockClipboard)
      document.removeEventListener('cut',         blockClipboard)
      document.removeEventListener('dragstart',   blockDrag)
      document.removeEventListener('selectstart', blockSelect)
      document.removeEventListener('keydown',     blockKeys)
      window.removeEventListener('resize',        checkDevTools)
      window.removeEventListener('beforeprint',   blockPrint)
      window.removeEventListener('afterprint',    restoreAfterPrint)
      clearInterval(devToolsInterval)
    }
  }, [])
}
