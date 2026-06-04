import React, { memo } from 'react';
import { Trophy, ArrowRight } from 'lucide-react';

const PrivacyPolicyCTA = memo(function PrivacyPolicyCTA() {
  return (
    <section className="w-full pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-[#FCFCFD] dark:bg-slate-800 border border-[#E8ECF4] dark:border-slate-700 shadow-sm rounded-[32px] p-4 md:p-6 pr-6 md:pr-8 transition-colors duration-200">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-[#FFB703] rounded-2xl flex items-center justify-center flex-shrink-0">
            <Trophy className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-[#0F1B3D] dark:text-white font-bold text-[22px] mb-1 transition-colors duration-200">
              Your success is our mission.
            </h3>
            <p className="text-[#666666] dark:text-slate-400 text-sm md:text-base max-w-sm transition-colors duration-200">
              Join thousands of CFA candidates who trust 1lasthour to achieve their goals.
            </p>
          </div>
        </div>
        <a 
          href="https://1lasthour.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[#E76F51] text-white font-bold rounded-xl whitespace-nowrap hover:bg-[#D65F42] transition-colors duration-200 flex items-center gap-2 shadow-sm"
        >
          Start Studying <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
});

PrivacyPolicyCTA.displayName = 'PrivacyPolicyCTA';

export { PrivacyPolicyCTA };
