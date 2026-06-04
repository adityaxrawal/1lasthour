import { Trophy, ArrowRight } from 'lucide-react';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const SuccessCTABanner = memo(function SuccessCTABanner() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="flex flex-col items-center justify-between gap-8 px-6 py-10 text-center md:flex-row md:px-12 md:text-left">
        {/* Left: trophy + text */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Trophy icon */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg">
            <Trophy size={38} className="text-white" strokeWidth={1.5} />
          </div>

          {/* Copy */}
          <div>
            <h2 className="mb-1.5 text-xl font-bold text-ink md:text-2xl">
              Your success is our mission.
            </h2>
            <p className="max-w-sm text-sm text-ink-secondary">
              Join thousands of CFA candidates who trust 1lasthour to achieve their goals.
            </p>
          </div>
        </div>

        {/* Right: CTA button */}
        <div className="shrink-0">
          <Link
            to="/"
            className="group flex items-center justify-center gap-2.5 rounded-xl bg-highlight px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-highlight-hover hover:shadow-lg hover:shadow-highlight/25"
          >
            Start Studying
            <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
});

SuccessCTABanner.displayName = 'SuccessCTABanner';
