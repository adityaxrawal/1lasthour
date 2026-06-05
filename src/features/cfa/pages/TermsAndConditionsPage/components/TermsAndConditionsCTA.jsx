/* eslint-disable react/no-unescaped-entities */
import { Trophy, ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export function TermsAndConditionsCTA() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 pb-20">
      <div className="rounded-[24px] overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative bg-[var(--color-highlight)]">
        {/* Soft background glow circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center lg:items-start text-center md:text-left gap-8 z-10 w-full lg:w-auto">
          {/* Trophy Icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 shadow-[0_8px_32px_rgba(47,108,255,0.3)]">
            <Trophy size={40} className="text-white" strokeWidth={2.5} />
          </div>

          <div className="flex flex-col max-w-[600px]">
            <h2 className="text-[32px] md:text-[40px] font-[800] text-white leading-[1.1] mb-4 tracking-[-0.5px]">
              Ready to ace your CFA Level 1?
            </h2>
            <p className="text-[18px] md:text-[20px] text-white/90 leading-[1.6]">
              Don't leave your preparation to chance. Start studying with structured, beautifully
              designed materials.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="z-10 w-full lg:w-auto flex justify-center lg:justify-end mt-4 lg:mt-0">
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-[12px] text-[#2f6cff] font-bold text-[18px] hover:bg-gray-50 hover:shadow-lg transition-all duration-300 w-full md:w-auto whitespace-nowrap"
          >
            Start Studying — It's Free
            <ArrowRight size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
