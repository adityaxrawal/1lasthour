/**
 * Copyright and watermark disclosure footer.
 * Render on every page that displays CFA content.
 */
export function CopyrightFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        padding:    '24px 32px',
        fontSize:   '12px',
        color:      '#666',
        borderTop:  '1px solid #eee',
        userSelect: 'none',
      }}
    >
      © {year} 1lasthour. All content is original and protected by copyright
      law. Reproduction, scraping, redistribution, or commercial use without
      written permission is strictly prohibited and will be prosecuted. All
      sessions are watermarked and logged.
    </footer>
  )
}
