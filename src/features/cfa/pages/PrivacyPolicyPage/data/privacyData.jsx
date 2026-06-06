import {
  User,
  ClipboardList,
  ShieldCheck,
  Cookie,
  Users,
  Lock,
  Baby,
  RefreshCw,
  Mail,
  Globe,
} from 'lucide-react';
import React from 'react';

import { ListContent } from '../components/ListContent';

const EFFECTIVE_DATE = 'June 5, 2026';
const LAST_UPDATED_DATE = 'June 7, 2026';
const COMPANY_NAME = '1lasthour';
const GOVERNING_JURISDICTION = 'India';
const GRIEVANCE_OFFICER_NAME = '--';
const GRIEVANCE_OFFICER_EMAIL = 'grievance@1lasthour.vercel.app';
const CONTACT_EMAIL = 'support@1lasthour.vercel.app';
const REGISTERED_ADDRESS = '--';

export const privacyData = {
  effectiveDate: EFFECTIVE_DATE,
  lastUpdated: LAST_UPDATED_DATE,
  version: '1.0',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: Globe,
      content: (
        <div className="space-y-4">
          <p>
            Welcome to 1lasthour. This Privacy Policy explains how {COMPANY_NAME} collects, uses,
            and discloses information about you when you access or use our platform at
            1lasthour.com.
          </p>
          <p>
            This policy is governed by the laws of {GOVERNING_JURISDICTION}, including the DPDP Act
            2023.
          </p>
        </div>
      ),
    },
    {
      id: 'scope',
      title: 'Scope',
      icon: ClipboardList,
      content: (
        <div className="space-y-4">
          <p>
            This policy applies to all users of the 1lasthour platform, specifically for CFA Level 1
            exam preparation.
          </p>
        </div>
      ),
    },
    {
      id: 'data_collected',
      title: 'Data We Collect',
      icon: User,
      content: (
        <ListContent
          description="We collect the following types of information:"
          items={[
            {
              title: 'Data you provide',
              text: 'Registration fields and profile information.',
            },
            {
              title: 'Data collected automatically',
              text: 'IP address, browser fingerprint, logs, cookies, and usage events (modules completed, quiz scores, study habits).',
            },
            {
              title: 'Data from third parties',
              text: 'OAuth providers (if applicable).',
            },
          ]}
        />
      ),
    },
    {
      id: 'how_we_use',
      title: 'How We Use Your Data',
      icon: ClipboardList,
      content: (
        <ListContent
          description="We use the collected information for:"
          items={[
            {
              title: 'Providing the Service',
              text: 'To ensure the platform functions correctly and tracks your study progress.',
            },
            {
              title: 'Personalization',
              text: 'To save your preferences (e.g., UI theme) and tailor your study experience.',
            },
            {
              title: 'Analytics',
              text: 'To analyze usage patterns and improve our platform.',
            },
          ]}
        />
      ),
    },
    {
      id: 'legal_basis',
      title: 'Legal Basis for Processing',
      icon: ShieldCheck,
      content: (
        <ListContent
          description="We process your data based on:"
          items={[
            {
              title: 'Consent',
              text: 'When you agree to our terms and use our platform.',
            },
            {
              title: 'Contract',
              text: 'To provide the educational services you requested.',
            },
            {
              title: 'Legitimate Interest',
              text: 'To improve our services and ensure security.',
            },
            {
              title: 'Legal Obligation',
              text: 'To comply with applicable laws and regulations.',
            },
          ]}
        />
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies & Local Storage',
      icon: Cookie,
      content: (
        <ListContent
          description="We use local storage keys:"
          items={[
            {
              title: 'theme',
              text: 'Stored in localStorage to remember your dark/light mode preference across sessions.',
            },
          ]}
          postDescription="We also use cryptographic signatures to secure your session."
        />
      ),
    },
    {
      id: 'third_party',
      title: 'Third-Party Sharing',
      icon: Users,
      content: (
        <div className="space-y-4">
          <p>We do not share, sell, or disclose your personal data to any third parties.</p>
        </div>
      ),
    },
    {
      id: 'your_rights',
      title: 'Your Rights',
      icon: Lock,
      content: (
        <ListContent
          description="Under the DPDP Act 2023 (and GDPR where applicable), you have:"
          items={[
            {
              title: 'Right to Access',
              text: 'You can request access to the personal data we hold about you.',
            },
            {
              title: 'Right to Correction',
              text: 'You can request correction of inaccurate data.',
            },
            {
              title: 'Right to Erasure',
              text: 'You can request deletion of your data.',
            },
            {
              title: 'Grievance Redressal',
              text: 'You have the right to readily available means of grievance redressal.',
            },
          ]}
        />
      ),
    },
    {
      id: 'childrens_privacy',
      title: "Children's Privacy",
      icon: Baby,
      content: (
        <div className="space-y-4">
          <p>
            Our Service is intended for individuals 18 years of age or older (the minimum age for
            CFA exam eligibility). We do not knowingly collect personal data from minors.
          </p>
        </div>
      ),
    },
    {
      id: 'security',
      title: 'Security Measures',
      icon: ShieldCheck,
      content: (
        <ListContent
          description="We implement technical measures to protect your data:"
          items={[
            {
              title: 'Session Security',
              text: 'We use cryptographic signatures (HMAC) and browser fingerprint binding to secure API requests.',
            },
          ]}
        />
      ),
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      icon: RefreshCw,
      content: (
        <div className="space-y-4">
          <p>
            We may update our Privacy Policy. We will notify you by posting the new policy on this
            page. Continued use of the platform constitutes acceptance of the changes.
          </p>
        </div>
      ),
    },
    {
      id: 'grievance_officer',
      title: 'Grievance Officer',
      icon: ShieldCheck,
      content: (
        <div className="space-y-4">
          <p>
            In accordance with the DPDP Act 2023, the contact details of the Grievance Officer are:
          </p>
          <p>
            {GRIEVANCE_OFFICER_NAME}
            <br />
            {COMPANY_NAME}
            <br />
            Email: {GRIEVANCE_OFFICER_EMAIL}
          </p>
        </div>
      ),
    },
    {
      id: 'contact_us',
      title: 'Contact Us',
      icon: Mail,
      content: (
        <div className="space-y-4">
          <p>If you have any questions, please contact us at:</p>
          <p>
            Email: {CONTACT_EMAIL}
            <br />
            Address: {REGISTERED_ADDRESS}
          </p>
        </div>
      ),
    },
  ],
};
