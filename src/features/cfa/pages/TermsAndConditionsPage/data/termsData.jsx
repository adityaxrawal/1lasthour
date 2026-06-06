import React from 'react';

const EFFECTIVE_DATE = 'June 5, 2026';
const LAST_UPDATED_DATE = 'June 7, 2026';
const COMPANY_NAME = '1lasthour';
const GOVERNING_JURISDICTION = 'India';
const CONTACT_EMAIL = 'support@1lasthour.vercel.app';

export const termsData = {
  effectiveDate: EFFECTIVE_DATE,
  lastUpdated: LAST_UPDATED_DATE,
  version: '1.0',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction & Acceptance',
      icon: 'Monitor',
      content: (
        <div className="space-y-4">
          <p>
            Welcome to 1lasthour. By accessing or using our platform, you agree to be bound by these
            Terms & Conditions.
          </p>
        </div>
      ),
    },
    {
      id: 'eligibility',
      title: 'Eligibility',
      icon: 'User',
      content: (
        <div className="space-y-4">
          <p>
            You must be at least 18 years old to use the Service. You must provide accurate
            information and maintain a valid account.
          </p>
        </div>
      ),
    },
    {
      id: 'account',
      title: 'Account Registration',
      icon: 'Lock',
      content: (
        <div className="space-y-4">
          <p>
            You are responsible for safeguarding your password and account security. You may only
            maintain one account per user.
          </p>
        </div>
      ),
    },
    {
      id: 'permitted_use',
      title: 'Permitted Use',
      icon: 'FileText',
      content: (
        <div className="space-y-4">
          <p>
            The Service is provided solely for personal, non-commercial use to assist in CFA Level 1
            exam preparation.
          </p>
        </div>
      ),
    },
    {
      id: 'prohibited',
      title: 'Prohibited Conduct',
      icon: 'AlertTriangle',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Sharing credentials with others.</li>
          <li>Scraping or automated access of our platform.</li>
          <li>Reverse engineering the platform.</li>
          <li>Circumventing content protection measures.</li>
          <li>Distributing proprietary content.</li>
          <li>Impersonation or abuse.</li>
        </ul>
      ),
    },
    {
      id: 'intellectual_property',
      title: 'Intellectual Property',
      icon: 'Scale',
      content: (
        <div className="space-y-4">
          <p>
            All content is owned by {COMPANY_NAME}. You are granted a personal, non-transferable
            licence. Reproduction or redistribution is strictly prohibited.
          </p>
        </div>
      ),
    },
    {
      id: 'content_protection',
      title: 'Content Protection',
      icon: 'ShieldCheck',
      content: (
        <div className="space-y-4">
          <p>
            We employ technical measures to protect our content, including cryptographic request
            signatures (HMAC). Circumvention of these measures is a material breach and grounds for
            immediate termination.
          </p>
        </div>
      ),
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers',
      icon: 'AlertTriangle',
      content: (
        <div className="space-y-4">
          <p>
            Our materials are for educational purposes only. They are not a substitute for official
            CFA Institute materials. We make no guarantee of exam results.
          </p>
        </div>
      ),
    },
    {
      id: 'cfa_trademark',
      title: 'CFA Institute Trademark Disclaimer',
      icon: 'ShieldCheck',
      content: (
        <div className="space-y-4">
          <p>
            CFA® and Chartered Financial Analyst® are registered trademarks of CFA Institute. This
            platform is not affiliated with, sponsored by, or endorsed by CFA Institute.
          </p>
        </div>
      ),
    },
    {
      id: 'limitation_liability',
      title: 'Limitation of Liability',
      icon: 'Scale',
      content: (
        <div className="space-y-4">
          <p>
            To the maximum extent permitted by law, {COMPANY_NAME} shall not be liable for any
            indirect or consequential losses arising out of your use of the Service. Our total
            liability is capped at the amount paid by you for the Service.
          </p>
        </div>
      ),
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      icon: 'ShieldCheck',
      content: (
        <div className="space-y-4">
          <p>
            You agree to indemnify and hold harmless {COMPANY_NAME} from any losses or claims
            arising from your misuse of the Service.
          </p>
        </div>
      ),
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: 'Lock',
      content: (
        <div className="space-y-4">
          <p>
            We may suspend or terminate your account for any violation of these Terms. Upon
            termination, your right to use the Service immediately ceases.
          </p>
        </div>
      ),
    },
    {
      id: 'governing_law',
      title: 'Governing Law & Dispute Resolution',
      icon: 'Scale',
      content: (
        <div className="space-y-4">
          <p>
            These Terms shall be governed by the laws of, {GOVERNING_JURISDICTION}. Any disputes
            shall be subject to the exclusive jurisdiction of the courts located in{' '}
            {GOVERNING_JURISDICTION}, India.
          </p>
        </div>
      ),
    },
    {
      id: 'changes_to_terms',
      title: 'Changes to Terms',
      icon: 'RefreshCw',
      content: (
        <div className="space-y-4">
          <p>
            We may update these Terms by posting notice on the platform. Continued use constitutes
            acceptance.
          </p>
        </div>
      ),
    },
    {
      id: 'contact_us',
      title: 'Contact Us',
      icon: 'Mail',
      content: (
        <div className="space-y-4">
          <p>Contact us at {CONTACT_EMAIL} for any questions about these Terms.</p>
        </div>
      ),
    },
  ],
};
