import { useEffect, useRef, memo } from 'react'

/**
 * Renders text to a canvas to prevent selection, copying, and OCR extraction.
 *
 * @param {{
 *   text:        string,
 *   fontSize?:   number,
 *   color?:      string,
 *   maxWidth?:   number,
 *   fontFamily?: string,
 *   watermarkId?: string,
 *   lineHeight?:  number,
 * }} props
 */
function ProtectedTextInner({
  text,
  fontSize    = 15,
  color       = '#1a1a1a',
  maxWidth    = 760,
  fontFamily  = '"Inter", "Geist", system-ui, sans-serif',
  watermarkId = '',
  lineHeight  = 1.65,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !text) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    // ── Word-wrap measurement ─────────────────────────────────────────────────
    ctx.font = `${fontSize}px ${fontFamily}`

    const words   = text.split(' ')
    const lines   = []
    let   current = ''

    for (const word of words) {
      const test = current ? `${current} ${word}` : word
      if (ctx.measureText(test).width > maxWidth - 32) {
        if (current) lines.push(current)
        current = word
      } else {
        current = test
      }
    }
    if (current) lines.push(current)

    const lineH       = fontSize * lineHeight
    const totalHeight = lines.length * lineH + 32

    // ── Canvas sizing (HiDPI-aware) ───────────────────────────────────────────
    canvas.width        = maxWidth    * dpr
    canvas.height       = totalHeight * dpr
    canvas.style.width  = `${maxWidth}px`
    canvas.style.height = `${totalHeight}px`
    ctx.scale(dpr, dpr)

    // ── Draw text ─────────────────────────────────────────────────────────────
    ctx.font         = `${fontSize}px ${fontFamily}`
    ctx.fillStyle    = color
    ctx.textBaseline = 'top'
    lines.forEach((line, i) => {
      ctx.fillText(line, 16, 16 + i * lineH)
    })

    // ── Anti-OCR noise (invisible to human readers, degrades OCR parsers) ─────
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const d         = imageData.data
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] === 0) continue            // skip fully transparent pixels
      const noise = () => Math.round((Math.random() - 0.5) * 4)
      d[i]     = Math.max(0, Math.min(255, d[i]     + noise()))
      d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + noise()))
      d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + noise()))
    }
    ctx.putImageData(imageData, 0, 0)

    // ── Visible session watermark ─────────────────────────────────────────────
    if (watermarkId) {
      ctx.save()
      ctx.globalAlpha = 0.04
      ctx.font        = '12px monospace'
      ctx.fillStyle   = '#000'
      ctx.translate(maxWidth / 2, totalHeight / 2)
      ctx.rotate(-Math.PI / 6)
      for (let x = -maxWidth; x < maxWidth; x += 280) {
        for (let y = -totalHeight; y < totalHeight; y += 70) {
          ctx.fillText(`© 1lasthour.com ${watermarkId}`, x, y)
        }
      }
      ctx.restore()
    }

    // ── Block right-click on this specific canvas ─────────────────────────────
    const noContext = (e) => e.preventDefault()
    canvas.addEventListener('contextmenu', noContext)
    return () => canvas.removeEventListener('contextmenu', noContext)
  }, [text, fontSize, color, maxWidth, fontFamily, watermarkId, lineHeight])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="CFA curriculum content"
      style={{
        display:            'block',
        userSelect:         'none',
        WebkitUserSelect:   'none',
        MozUserSelect:      'none',
        WebkitTouchCallout: 'none',
        pointerEvents:      'none',
        maxWidth:           '100%',
      }}
    />
  )
}

export const ProtectedText = memo(ProtectedTextInner)
