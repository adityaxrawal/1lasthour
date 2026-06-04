import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { LOSContainer } from '@features/cfa/components';

import { useLOSTabSection } from '../useLOSTabSection';

const LOSTabSection = memo(function LOSTabSection({ learningOutcomes }) {
  const { selectedIndex, setSelectedIndex, selectedLOS, goToPrev, goToNext } =
    useLOSTabSection(learningOutcomes);

  const scrollRef = React.useRef(null);

  // Auto-scroll the selected tab into view
  React.useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const activeTab = container.children[selectedIndex];
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="los-tab-section space-y-6">
      {/* Compact Tab Bar */}
      <div className="flex items-center rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        {/* Prev Button */}
        <button
          onClick={goToPrev}
          disabled={selectedIndex === 0}
          className="flex h-14 w-14 shrink-0 items-center justify-center border-r border-border text-ink-secondary transition-all hover:bg-canvas-inset hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous LOS"
          type="button"
        >
          <ChevronRight className="h-5 w-5 rotate-180" />
        </button>

        {/* Tab Pills */}
        <div className="scrollbar-none flex-1 overflow-x-auto px-2">
          <div ref={scrollRef} className="flex w-max min-w-full">
            {learningOutcomes.map((los, index) => (
              <button
                key={los.losId}
                onClick={() => setSelectedIndex(index)}
                type="button"
                className={`
                  flex min-w-fit flex-col items-center justify-center gap-1 whitespace-nowrap px-6 pt-3 pb-2 text-sm transition-all duration-150
                  ${
                    selectedIndex === index
                      ? 'text-brand font-semibold'
                      : 'text-ink-secondary hover:text-ink font-medium'
                  }
                `}
                style={{
                  borderBottom:
                    selectedIndex === index
                      ? `3px solid ${los.color || '#0052cc'}`
                      : '3px solid transparent',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{los.icon}</span>
                  <span>{los.losCode}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          disabled={selectedIndex === learningOutcomes.length - 1}
          className="flex h-14 w-14 shrink-0 items-center justify-center border-l border-border text-ink-secondary transition-all hover:bg-canvas-inset hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Next LOS"
          type="button"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Selected LOS Content */}
      <LOSContainer los={selectedLOS} />
    </div>
  );
});

LOSTabSection.propTypes = {
  learningOutcomes: PropTypes.arrayOf(
    PropTypes.shape({
      losId: PropTypes.string.isRequired,
      losCode: PropTypes.string.isRequired,
      icon: PropTypes.node,
      color: PropTypes.string,
    })
  ).isRequired,
};

LOSTabSection.displayName = 'LOSTabSection';

export { LOSTabSection };
export default LOSTabSection;
