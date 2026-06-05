/* eslint-disable jsx-a11y/no-static-element-interactions */
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { useZoomPan } from '@/hooks/useZoomPan';

import { ModalControls } from './components/ModalControls';

const ModalToolbar = memo(function ModalToolbar({ onClose }) {
  return (
    <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
      <button
        type="button"
        onClick={onClose}
        className="rounded-full border border-slate-700 bg-slate-800/90 p-2.5 shadow-lg transition-all duration-200 text-slate-200 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-400"
      >
        <X size={20} />
      </button>
    </div>
  );
});
ModalToolbar.propTypes = { onClose: PropTypes.func.isRequired };

const PanContainer = memo(function PanContainer({
  containerRef,
  imageRef,
  isDragging,
  isPinching,
  zoom,
  imageSrc,
  altText,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
}) {
  return (
    <div
      ref={containerRef}
      className={`custom-scrollbar flex h-full w-full flex-1 items-center justify-center overflow-auto ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className={`m-auto origin-center p-8 ease-out ${
          !isPinching ? 'transition-all duration-300' : ''
        }`}
        style={{
          width: `${zoom}%`,
          minWidth: '100%',
          flexShrink: 0,
          willChange: 'width',
        }}
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt={altText}
          className="pointer-events-none h-auto w-full select-none rounded-lg drop-shadow-2xl"
          draggable={false}
        />
      </div>
    </div>
  );
});
PanContainer.propTypes = {
  containerRef: PropTypes.object,
  imageRef: PropTypes.object,
  isDragging: PropTypes.bool.isRequired,
  isPinching: PropTypes.bool.isRequired,
  zoom: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
};

// ─── Component ────────────────────────────────────────────────────────────────

const ZoomableImageModal = memo(function ZoomableImageModal({
  isOpen,
  onClose,
  imageSrc,
  altText = 'Zoomable Image',
}) {
  const {
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
  } = useZoomPan({ isOpen });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
      <div
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        role="presentation"
      />
      <div className="animate-in fade-in zoom-in-95 relative z-10 flex h-[90vh] w-full max-w-[95vw] flex-col overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/50 shadow-2xl duration-200">
        <ModalToolbar onClose={onClose} />

        <PanContainer
          containerRef={containerRef}
          imageRef={imageRef}
          isDragging={isDragging}
          isPinching={isPinching}
          zoom={zoom}
          imageSrc={imageSrc}
          altText={altText}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
        />

        <ModalControls
          zoom={zoom}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
});

ZoomableImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string,
};

ZoomableImageModal.defaultProps = {
  altText: 'Zoomable Image',
};

ZoomableImageModal.displayName = 'ZoomableImageModal';

export { ZoomableImageModal };
export default ZoomableImageModal;
