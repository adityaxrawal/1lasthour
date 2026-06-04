export const calculateZoom = (prevZoom, delta) => {
  const zoomFactor = 1.01 ** delta;
  const newZoom = prevZoom * zoomFactor;
  return Math.min(Math.max(newZoom, 50), 600);
};

export const calculateZoomIn = (prevZoom) => Math.min(prevZoom * 1.25, 600);
export const calculateZoomOut = (prevZoom) => Math.max(prevZoom / 1.25, 50);

export const calculatePan = (e, startPos, scrollPos) => {
  const dx = e.clientX - startPos.x;
  const dy = e.clientY - startPos.y;
  return {
    left: scrollPos.left - dx,
    top: scrollPos.top - dy,
  };
};
