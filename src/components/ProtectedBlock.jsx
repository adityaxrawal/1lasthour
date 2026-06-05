/**
 * Wraps content with a transparent interaction-blocking overlay.
 * Use around tables, question cards, answer grids, or any structured
 * CFA content that cannot be replaced with ProtectedText.
 *
 * @param {{ children: import('react').ReactNode }} props
 */
export function ProtectedBlock({ children }) {
  return (
    <div style={{ position: 'relative', isolation: 'isolate' }}>
      {/* Transparent overlay — intercepts context menu and drag on child nodes */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 50,
          backgroundColor: 'transparent',
          cursor: 'default',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      {children}
    </div>
  );
}
