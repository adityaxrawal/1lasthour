import React, { memo } from 'react';
import { Calendar, ShieldCheck, User } from 'lucide-react';

const PrivacyPolicyHero = memo(function PrivacyPolicyHero() {
  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
      <div className="w-full lg:w-[55%]">
        <span className="inline-block tracking-widest text-[#1E4FCD] dark:text-blue-400 text-sm font-bold uppercase mb-4">
          Legal
        </span>
        <h1 className="text-4xl md:text-[48px] font-bold text-[#0F1B3D] dark:text-white mb-6 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-lg text-[#666666] dark:text-slate-400 mb-8 leading-relaxed max-w-2xl">
          Your privacy is important to us. This Privacy Policy explains how we collect,
          use, and protect your personal data when you use 1LastHour.
        </p>
        <div className="flex items-center gap-2 text-[#666666] dark:text-slate-300 font-medium bg-[#F8F9FD] dark:bg-slate-800 py-2 px-4 rounded-full w-fit">
          <Calendar className="w-4 h-4 text-[#1E4FCD] dark:text-blue-400" />
          <span>Effective Date: <span className="text-[#1E4FCD] dark:text-blue-400">October 1, 2023</span></span>
        </div>
      </div>
      
      <div className="w-full lg:w-[45%] hidden md:flex justify-center">
        {/* 3D Illustration CSS Mockup */}
        <div className="relative w-72 h-80">
          <div className="absolute inset-0 bg-[#F8F9FD] dark:bg-slate-800 rounded-2xl border border-[#E8ECF4] dark:border-slate-700 shadow-[0_20px_50px_rgba(30,79,205,0.1)] dark:shadow-none transform rotate-3 flex flex-col p-6 overflow-hidden transition-colors duration-200">
            <div className="h-6 w-1/2 bg-[#E8ECF4] dark:bg-slate-700 rounded-md mb-8"></div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-sm bg-[#1E4FCD] dark:bg-blue-500 opacity-20"></div>
                <div className="h-3 w-full bg-[#E8ECF4] dark:bg-slate-700 rounded-sm"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-sm bg-[#1E4FCD] dark:bg-blue-500 opacity-20"></div>
                <div className="h-3 w-4/5 bg-[#E8ECF4] dark:bg-slate-700 rounded-sm"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-sm bg-[#1E4FCD] dark:bg-blue-500 opacity-20"></div>
                <div className="h-3 w-5/6 bg-[#E8ECF4] dark:bg-slate-700 rounded-sm"></div>
              </div>
            </div>
            {/* Badge decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#1E4FCD] dark:bg-blue-500 rounded-full opacity-10 blur-xl"></div>
          </div>
          {/* Floating Shield */}
          <div className="absolute -left-8 -bottom-4 w-20 h-20 bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center transform -rotate-12 border border-[#E8ECF4] dark:border-slate-700 transition-colors duration-200">
            <ShieldCheck className="w-10 h-10 text-[#F05A28]" />
          </div>
          {/* Floating Avatar */}
          <div className="absolute -right-6 top-12 w-16 h-16 bg-white dark:bg-slate-900 rounded-full shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center transform rotate-12 border border-[#E8ECF4] dark:border-slate-700 transition-colors duration-200">
            <User className="w-8 h-8 text-[#1E4FCD] dark:text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
});

PrivacyPolicyHero.displayName = 'PrivacyPolicyHero';

export { PrivacyPolicyHero };
