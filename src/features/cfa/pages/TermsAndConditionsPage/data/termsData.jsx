/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export const termsData = [
  {
    id: 1,
    title: 'Description of Service',
    icon: 'Monitor',
    content: (
      <div className="space-y-4">
        <p>
          1LastHour provides a platform for CFA candidates to access study materials, practice questions, mock exams, and performance analytics (collectively, the "Service").
        </p>
        <p>
          We reserve the right to modify, suspend, or discontinue the Service at any time, with or without notice to you. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Service.
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: 'No Affiliation with CFA Institute',
    icon: 'ShieldCheck',
    content: (
      <div className="space-y-4">
        <p>
          1LastHour is an independent preparation service and is not affiliated with, endorsed by, or sponsored by the CFA Institute.
        </p>
        <p>
          CFA Institute, CFA®, and Chartered Financial Analyst® are trademarks owned by CFA Institute. Use of these marks on our platform is solely for the purpose of identifying the exam for which our materials are designed to help candidates prepare.
        </p>
      </div>
    )
  },
  {
    id: 3,
    title: 'User Accounts and Security',
    icon: 'Lock',
    content: (
      <div className="space-y-4">
        <p>
          To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#2f6cff] dark:text-blue-400 marker:text-[#2f6cff] dark:marker:text-blue-400">
          <li><span className="text-[#667085] dark:text-slate-300">You are responsible for safeguarding your password and any other credentials.</span></li>
          <li><span className="text-[#667085] dark:text-slate-300">You agree not to disclose your password to any third party.</span></li>
          <li><span className="text-[#667085] dark:text-slate-300">You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</span></li>
        </ul>
      </div>
    )
  },
  {
    id: 4,
    title: 'Intellectual Property Rights',
    icon: 'FileText',
    content: (
      <div className="space-y-4">
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of 1LastHour and its licensors. Our materials are protected by copyright, trademark, and other laws.
        </p>
        <p>
          You are explicitly restricted from all of the following:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold">❌</span>
            <span className="font-medium dark:text-slate-200">Republish material</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold">❌</span>
            <span className="font-medium dark:text-slate-200">Sell/rent/sublicense</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold">❌</span>
            <span className="font-medium dark:text-slate-200">Reproduce/copy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold">❌</span>
            <span className="font-medium dark:text-slate-200">Redistribute</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: 'User Data and Privacy',
    icon: 'User',
    content: (
      <div className="space-y-4">
        <p>
          Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy, which explains how we collect, use, and share information about you.
        </p>
        <p>
          By using the Service, you consent to the collection and use of this information in accordance with our Privacy Policy.
        </p>
      </div>
    )
  },
  {
    id: 6,
    title: 'Financial Data Disclaimer',
    icon: 'PieChart',
    content: (
      <div className="space-y-4">
        <p>
          The materials provided by 1LastHour are for educational and exam preparation purposes only. They do not constitute financial, investment, legal, or tax advice.
        </p>
        <p>
          We do not guarantee the accuracy, completeness, or usefulness of any information on the Service, and you rely on such information strictly at your own risk.
        </p>
      </div>
    )
  },
  {
    id: 7,
    title: 'Disclaimer of Warranties',
    icon: 'AlertTriangle',
    content: (
      <div className="space-y-4">
        <p>
          The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. 1LastHour makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content or materials included therein.
        </p>
        <p>
          You expressly agree that your use of the Service is at your sole risk.
        </p>
      </div>
    )
  },
  {
    id: 8,
    title: 'Limitation of Liability',
    icon: 'Scale',
    content: (
      <div className="space-y-4">
        <p>
          In no event shall 1LastHour, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
        </p>
        <p>
          This limitation of liability applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if 1LastHour has been advised of the possibility of such damage.
        </p>
      </div>
    )
  },
  {
    id: 9,
    title: 'Modifications to the Service and Terms',
    icon: 'RefreshCw',
    content: (
      <div className="space-y-4">
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
        </p>
        <p>
          What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
        </p>
      </div>
    )
  },
  {
    id: 10,
    title: 'Contact Us',
    icon: 'Mail',
    content: (
      <div className="space-y-4">
        <p>
          If you have any questions about these Terms, please contact us.
        </p>
        <p>
          Email: <a href="mailto:legal@1lasthour.com" className="text-[#2f6cff] dark:text-blue-400 hover:underline">legal@1lasthour.com</a>
        </p>
      </div>
    )
  }
];
