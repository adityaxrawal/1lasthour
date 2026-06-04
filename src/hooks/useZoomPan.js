import { useState, useRef, useEffect, useCallback } from 'react';
import { calculateZoom, calculateZoomIn, calculateZoomOut, calculatePan } from '../utils/zoomPanHelpers';

export const useZoomPan = ({ isOpen }) => {
  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });

  const [isPinching, setIsPinching] = useState(false);
  const pinchTimeoutRef = useRef(null);

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setZoom(100);
    }
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setIsPinching(true);
        if (pinchTimeoutRef.current) clearTimeout(pinchTimeoutRef.current);
        pinchTimeoutRef.current = setTimeout(() => setIsPinching(false), 150);

        setZoom((prev) => calculateZoom(prev, -e.deltaY));
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (pinchTimeoutRef.current) clearTimeout(pinchTimeoutRef.current);
    };
  }, [isOpen]);

  const handleZoomIn = useCallback(() => setZoom(calculateZoomIn), []);
  const handleZoomOut = useCallback(() => setZoom(calculateZoomOut), []);
  const handleReset = useCallback(() => setZoom(100), []);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    if (containerRef.current) {
      setScrollPos({
        left: containerRef.current.scrollLeft,
        top: containerRef.current.scrollTop,
      });
    }
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      const pan = calculatePan(e, startPos, scrollPos);
      containerRef.current.scrollLeft = pan.left;
      containerRef.current.scrollTop = pan.top;
    },
    [isDragging, startPos, scrollPos]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  return {
    zoom,
    isDragging,
    isPinching,
    containerRef,
    imageRef,
    handleZoomIn,
    handleZoomOut,
    handleReset,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
