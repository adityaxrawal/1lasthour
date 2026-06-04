import { Calendar } from 'lucide-react';
import React from 'react';

import { termsData } from '../data/termsData.jsx';

import { TermsSectionCard } from './TermsSectionCard';


export function TermsContentArea() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-[32px] p-6 md:p-10 my-12 dark:ring-1 dark:ring-slate-800">
      
      {/* Effective Date Card */}
      <div className="bg-white dark:bg-slate-800 border border-[#edf1f7] dark:border-slate-700 rounded-[20px] p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] mb-12 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-16 h-16 rounded-2xl bg-[#f4f7ff] dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-[#2f6cff] dark:text-blue-400">
          <Calendar size={28} strokeWidth={2} />
        </div>
        <div className="text-center md:text-left flex-grow pt-2">
          <h2 className="text-[20px] md:text-[24px] font-bold text-[#102a5c] dark:text-white mb-2">
            Effective Date: <span className="text-[#2f6cff] dark:text-blue-400">{currentDate}</span>
          </h2>
          <p className="text-[16px] leading-[1.8] text-[#667085] dark:text-slate-300">
            These Terms and Conditions constitute a legally binding agreement made between you and 1LastHour concerning your access to and use of our platform. We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason.
          </p>
        </div>
      </div>

      {/* Sections List */}
      <div className="flex flex-col gap-4">
        {termsData.map((section) => (
          <TermsSectionCard key={section.id} section={section} />
        ))}
      </div>
      
    </div>
  );
}
