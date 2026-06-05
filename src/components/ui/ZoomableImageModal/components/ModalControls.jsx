import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const ModalControls = memo(function ModalControls({
  zoom,
  handleZoomIn,
  handleZoomOut,
  handleReset,
}) {
  return (
    <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-2xl border border-slate-700/80 bg-slate-800/90 p-1.5 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
      <button
        type="button"
        onClick={handleZoomOut}
        className="rounded-xl p-2.5 transition-all text-slate-400 hover:bg-slate-700/80 hover:text-white active:scale-95"
        title="Zoom Out"
      >
        <ZoomOut size={18} />
      </button>

      <div className="min-w-[3.5rem] px-2 text-center font-mono text-xs font-medium text-slate-300">
        {zoom}%
      </div>

      <button
        type="button"
        onClick={handleZoomIn}
        className="rounded-xl p-2.5 transition-all text-slate-400 hover:bg-slate-700/80 hover:text-white active:scale-95"
        title="Zoom In"
      >
        <ZoomIn size={18} />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-700/50" />

      <button
        type="button"
        onClick={handleReset}
        className="rounded-xl p-2.5 transition-all text-slate-400 hover:bg-purple-500/10 hover:text-purple-400 active:scale-95"
        title="Reset View"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
});

ModalControls.propTypes = {
  zoom: PropTypes.number.isRequired,
  handleZoomIn: PropTypes.func.isRequired,
  handleZoomOut: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

ModalControls.displayName = 'ModalControls';

export { ModalControls };
export default ModalControls;
