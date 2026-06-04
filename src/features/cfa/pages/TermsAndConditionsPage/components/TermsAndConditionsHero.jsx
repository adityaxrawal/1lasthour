import { Shield, FileText, CheckCircle } from 'lucide-react';
import React from 'react';

export function TermsAndConditionsHero() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between rounded-3xl overflow-hidden mb-12 px-8 md:px-12 lg:px-16">
      <div className="w-full md:w-[45%] flex flex-col items-start z-10">
        <span 
          className="inline-block text-[11px] font-semibold tracking-[0.5px] rounded-full mb-6 bg-[#eef4ff] text-[#3563ff] dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1.5"
        >
          LEGAL
        </span>
        
        <h1 
          className="text-[40px] md:text-[64px] font-[800] leading-[1.05] tracking-[-1.5px] mb-6 text-[#08245c] dark:text-white"
        >
          Terms and Conditions
        </h1>
        
        <p 
          className="text-[18px] leading-[1.8] max-w-[480px] text-[#6b7280] dark:text-slate-300"
        >
          Please read these terms and conditions carefully before using 1LastHour. By accessing or using our Service, you agree to be bound by these terms.
        </p>
      </div>

      <div className="w-full md:w-[55%] flex justify-center md:justify-end relative z-10 min-h-[300px]">
        {/* Recreating the illustration using SVGs and HTML elements */}
        <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] flex items-center justify-center">
          {/* Soft circular background shape */}
          <div 
            className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full opacity-60 mix-blend-multiply filter blur-3xl bg-gradient-to-br from-[#dbe4ff] to-[#eef2ff] dark:from-blue-900/20 dark:to-indigo-900/20"
           />
          <div 
            className="absolute w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full right-0 top-0 opacity-40 mix-blend-multiply filter blur-2xl bg-gradient-to-br from-[#ffe4d6] to-[#fff0e6] dark:from-orange-900/20 dark:to-red-900/20"
           />

          {/* Floating Terms & Conditions document card */}
          <div 
            className="relative bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl w-[260px] md:w-[320px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#edf1f7] dark:border-slate-700 transform -rotate-2"
            style={{ zIndex: 10 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f4f7ff] dark:bg-slate-700 text-[#2f6cff] dark:text-blue-400">
                <FileText size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <div className="h-2.5 w-24 bg-[#e2e8f0] dark:bg-slate-600 rounded-full mb-2" />
                <div className="h-2 w-16 bg-[#f1f5f9] dark:bg-slate-700 rounded-full" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-2 w-full bg-[#f1f5f9] dark:bg-slate-700 rounded-full" />
              <div className="h-2 w-[90%] bg-[#f1f5f9] dark:bg-slate-700 rounded-full" />
              <div className="h-2 w-[95%] bg-[#f1f5f9] dark:bg-slate-700 rounded-full" />
              <div className="h-2 w-[80%] bg-[#f1f5f9] dark:bg-slate-700 rounded-full" />
              <div className="h-2 w-[85%] bg-[#f1f5f9] dark:bg-slate-700 rounded-full" />
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-[#f8fafc] dark:bg-slate-600 border-2 border-white dark:border-slate-800 shadow-sm z-20" />
                <div className="w-8 h-8 rounded-full bg-[#f1f5f9] dark:bg-slate-700 border-2 border-white dark:border-slate-800 shadow-sm -ml-4 z-10" />
              </div>
              <div className="h-6 w-20 bg-[#f4f7ff] dark:bg-slate-700 rounded-md" />
            </div>
          </div>

          {/* Floating Blue Shield Icon */}
          <div 
            className="absolute left-6 top-16 md:left-0 md:top-36 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.3)] border border-[#edf1f7] dark:border-slate-700"
            style={{ zIndex: 20 }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f4f7ff] dark:bg-slate-700 text-[#2f6cff] dark:text-blue-400">
              <Shield size={22} strokeWidth={2.5} />
            </div>
          </div>

          {/* Floating Orange Check Marks */}
          <div 
            className="absolute right-2 bottom-20 md:right-4 md:bottom-24 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.3)] border border-[#edf1f7] dark:border-slate-700"
            style={{ zIndex: 20 }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#fff0e6] dark:bg-slate-700 text-[#f76b1c] dark:text-orange-400">
              <CheckCircle size={28} strokeWidth={2.5} />
            </div>
          </div>
          
          <div 
            className="absolute right-12 top-4 md:right-16 md:top-8 bg-white dark:bg-slate-800 p-2.5 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.2)] border border-[#edf1f7] dark:border-slate-700 transform rotate-12"
            style={{ zIndex: 20 }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fff0e6] dark:bg-slate-700 text-[#f76b1c] dark:text-orange-400">
              <CheckCircle size={18} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
