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

const ListContent = ({ description, items, postDescription }) => (
  <div className="space-y-4">
    <p>{description}</p>
    <ul className="list-disc pl-5 space-y-2">
      {items.map((item, idx) => (
        <li key={idx}>
          <strong>{item.title}:</strong> {item.text}
        </li>
      ))}
    </ul>
    {postDescription && <p>{postDescription}</p>}
  </div>
);

// noinspection DuplicatedCode
export const SECTIONS = [
  {
    id: 1,
    title: 'Information We Collect',
    icon: User,
    content: (
      <ListContent
        description="We may collect the following types of information when you use 1LastHour:"
        items={[
          {
            title: 'Personal Information',
            text: 'When you create an account, we may collect your name, email address, and other contact details.',
          },
          {
            title: 'Study Data',
            text: 'We track your progress through the CFA Level 1 Curriculum, including modules completed, quiz scores, and study habits to provide personalized analytics.',
          },
          {
            title: 'Usage Data & Device Information',
            text: 'We automatically collect data about your interaction with our platform, such as your IP address, browser type, device information, and pages visited.',
          },
        ]}
      />
    ),
  },
  {
    id: 2,
    title: 'How We Use Your Information',
    icon: ClipboardList,
    content: (
      <ListContent
        description="We use the collected information for various purposes, including:"
        items={[
          {
            title: 'To Provide and Maintain our Service',
            text: 'Ensuring the platform functions correctly, including the CFA curriculum browser and study dashboard.',
          },
          {
            title: 'To Personalize Your Experience',
            text: 'Saving your preferences (such as dark/light theme settings via local storage) and tailoring your study experience.',
          },
          {
            title: 'To Improve our Platform',
            text: 'Analyzing usage patterns to enhance features, optimize performance, and develop new tools.',
          },
          {
            title: 'To Communicate with You',
            text: 'Sending you updates, newsletters, security alerts, and support messages.',
          },
        ]}
      />
    ),
  },
  {
    id: 3,
    title: 'Data Storage and Security',
    icon: ShieldCheck,
    content: (
      <ListContent
        description="The security of your data is important to us. We implement industry-standard security measures to protect your personal and financial information:"
        items={[
          {
            title: 'Session Security',
            text: 'We use cryptographic signatures and fingerprint binding to ensure session-based API security and prevent unauthorized access.',
          },
          {
            title: 'Local Storage',
            text: 'Non-sensitive preferences (like UI themes) are stored locally on your device for performance optimization.',
          },
          {
            title: 'Encryption',
            text: 'We use secure protocols (HTTPS) to transmit data between your browser and our servers.',
          },
        ]}
        postDescription="While we strive to use commercially acceptable means to protect your personal data, no method of transmission over the Internet is 100% secure."
      />
    ),
  },
  {
    id: 4,
    title: 'Cookies and Tracking Technologies',
    icon: Cookie,
    content: (
      <div className="space-y-4">
        <p>
          We use cookies, local storage, and similar tracking technologies to track activity on our
          platform and hold certain information. You can instruct your browser to refuse all cookies
          or to indicate when a cookie is being sent. However, if you do not accept cookies or local
          storage, some parts of our platform may not function properly.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Third-Party Services',
    icon: Users,
    content: (
      <div className="space-y-4">
        <p>
          We may employ third-party companies and individuals to facilitate our Service, provide the
          Service on our behalf, perform Service-related services, or assist us in analyzing how our
          Service is used. These third parties have access to your personal data only to perform
          these tasks on our behalf and are obligated not to disclose or use it for any other
          purpose.
        </p>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Your Data Protection Rights',
    icon: Lock,
    content: (
      <div className="space-y-4">
        <p>
          Depending on your location, you may have the following rights regarding your personal
          data:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>
              The right of rectification: You have the right to have your information rectified if
              that information is inaccurate or incomplete.
            </li>
            <li>
              The right to object: You have the right to object to our processing of your personal
              data.
            </li>
          </ul>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The right of restriction: You have the right to request that we restrict the
              processing of your personal information.
            </li>
            <li>
              The right to data portability: You have the right to be provided with a copy of the
              information we have on you in a structured, human-readable format.
            </li>
            <li>
              The right to withdraw consent: You have the right to withdraw your consent at any time
              where 1LastHour relied on your consent to process your personal information.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Children's Privacy",
    icon: Baby,
    content: (
      <div className="space-y-4">
        <p>
          Our Service does not address anyone under the age of 13. We do not knowingly collect
          personally identifiable information from anyone under the age of 13. If you are a parent
          or guardian and you are aware that your child has provided us with personal data, please
          contact us.
        </p>
      </div>
    ),
  },
  {
    id: 8,
    title: 'Changes to This Privacy Policy',
    icon: RefreshCw,
    content: (
      <div className="space-y-4">
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the &quot;Effective Date&quot; at
          the top. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </div>
    ),
  },
  {
    id: 9,
    title: 'Contact Us',
    icon: Mail,
    content: (
      <div className="space-y-4">
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F8F9FD] dark:bg-slate-700 flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#1E4FCD] dark:text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-[#666666] dark:text-slate-400">By email:</span>
              <a
                href="mailto:support@1lasthour.com"
                className="font-medium text-[#1E4FCD] dark:text-blue-400 hover:underline"
              >
                support@1lasthour.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F8F9FD] dark:bg-slate-700 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#1E4FCD] dark:text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-[#666666] dark:text-slate-400">
                By visiting our website:
              </span>
              <a
                href="https://1lasthour.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#1E4FCD] dark:text-blue-400 hover:underline"
              >
                1lasthour.com
              </a>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];
