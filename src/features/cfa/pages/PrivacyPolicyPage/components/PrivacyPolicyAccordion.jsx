import { ChevronDown } from 'lucide-react';
import React, { memo, useState } from 'react';

import { privacyData } from '../data/privacyData.jsx';

const SECTIONS = privacyData.sections;

const PrivacyPolicyAccordion = memo(function PrivacyPolicyAccordion() {
  const [openSectionIds, setOpenSectionIds] = useState(() => new Set(SECTIONS.map((s) => s.id)));

  const toggleSection = (id) => {
    setOpenSectionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="mx-auto space-y-4">
      {SECTIONS.map((section, index) => {
        const isOpen = openSectionIds.has(section.id);
        return (
          <div
            key={section.id}
            className="border border-[#E8ECF4] dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm transition-all duration-200"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4FCD] dark:focus-visible:ring-blue-400 transition-colors hover:bg-[#F8F9FD]/50 dark:hover:bg-slate-700/50"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex w-12 h-12 rounded-xl bg-[#F8F9FD] dark:bg-slate-700 border border-[#E8ECF4] dark:border-slate-600 items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <section.icon className="w-5 h-5 text-[#1E4FCD] dark:text-blue-400" />
                </div>
                <div className="w-7 h-7 rounded-full bg-[#1E4FCD] dark:bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors duration-200">
                  {index + 1}
                </div>
                <h2 className="text-lg md:text-xl font-bold text-[#0F1B3D] dark:text-white transition-colors duration-200">
                  {section.title}
                </h2>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-[#999999] dark:text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'transform rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-5 md:p-6 pt-0 sm:pl-[5.5rem] text-[#666666] dark:text-slate-300 leading-relaxed transition-colors duration-200">
                <div className="pt-4 border-t border-[#E8ECF4] dark:border-slate-700 transition-colors duration-200">
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

PrivacyPolicyAccordion.displayName = 'PrivacyPolicyAccordion';

export { PrivacyPolicyAccordion };
