/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { ChevronDown, Monitor, ShieldCheck, Lock, FileText, User, PieChart, AlertTriangle, Scale, RefreshCw, Mail } from 'lucide-react';
import React, { useState } from 'react';

const iconMap = {
  Monitor: Monitor,
  ShieldCheck: ShieldCheck,
  Lock: Lock,
  FileText: FileText,
  User: User,
  PieChart: PieChart,
  AlertTriangle: AlertTriangle,
  Scale: Scale,
  RefreshCw: RefreshCw,
  Mail: Mail
};

export function TermsSectionCard({ section }) {
  const [isOpen, setIsOpen] = useState(true); // Default all to open per screenshot, or maybe they are togglable? Screenshot shows them open or just normal cards. Let's make them normal cards, maybe chevron implies toggle. I will keep them open by default but allow toggling just in case, or just static. The screenshot seems to show static cards with a chevron. I will make them togglable.

  const IconComponent = iconMap[section.icon] || FileText;

  return (
    <div className="bg-white dark:bg-slate-800 border border-[#edf1f7] dark:border-slate-700 rounded-[20px] p-7 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
      <div 
        className="flex items-start justify-between cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Left Icon Area */}
          <div className="flex-shrink-0 relative">
            <div className="w-16 h-16 rounded-2xl bg-[#f4f7ff] dark:bg-slate-700 flex items-center justify-center text-[#2f6cff] dark:text-blue-400">
              <IconComponent size={28} strokeWidth={2} />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#2f6cff] dark:bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-white dark:border-slate-800">
              {section.id}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] md:text-[28px] font-bold text-[#102a5c] dark:text-white">
                {section.title}
              </h2>
              <button 
                className={clsx(
                  "text-[#6f7b91] dark:text-slate-400 transition-transform duration-300 ml-4 flex-shrink-0 md:hidden",
                  isOpen ? "rotate-180" : "rotate-0"
                )}
              >
                <ChevronDown size={24} />
              </button>
            </div>
            
            <div 
              className={clsx(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
              )}
            >
              <div className="text-[16px] leading-[1.9] text-[#667085] dark:text-slate-300">
                {section.content}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Chevron */}
        <button 
          className={clsx(
            "text-[#6f7b91] dark:text-slate-400 transition-transform duration-300 mt-4 ml-4 hidden md:block",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
}
