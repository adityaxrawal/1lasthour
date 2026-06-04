import { BookOpen, Calculator, Search, FileText, BarChart3, Moon } from 'lucide-react';

export const LANDING_NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'About Exam', id: 'about-exam', path: '/about-exam' },
  { label: 'FAQ', id: 'faq' },
];

export const LANDING_FEATURES = [
  {
    icon: BookOpen,
    title: 'Structured Curriculum',
    description:
      'All 10 CFA Level 1 topics organized into digestible modules with clear learning paths and exam weight breakdowns.',
  },
  {
    icon: Calculator,
    title: 'Formula Library',
    description:
      'Every critical formula rendered beautifully with KaTeX — from time value of money to Black-Scholes.',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description:
      'Instantly find any concept, formula, or module across the entire curriculum. Search as you type.',
  },
  {
    icon: FileText,
    title: 'Cheat Sheets',
    description:
      'One-page reference guides for each topic. Perfect for that final review before the exam.',
  },
  {
    icon: BarChart3,
    title: 'Exam Weight Tracking',
    description:
      'See exactly how each topic is weighted on the exam so you can prioritize your study time effectively.',
  },
  {
    icon: Moon,
    title: 'Dark & Light Mode',
    description:
      'Study at any hour. Calibrated contrast ratios reduce eye strain during those late-night sessions.',
  },
];

export const LANDING_FAQS = [
  {
    question: 'Is 1lasthour free to use?',
    answer:
      'Yes! 1lasthour is completely free. Our mission is to make high-quality CFA study materials accessible to every candidate, regardless of budget.',
  },
  {
    question: 'Does this cover the full CFA Level 1 syllabus?',
    answer:
      'We cover all 10 topics of the CFA Level 1 curriculum including Ethics, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Issuers, Equity Investments, Fixed Income, Derivatives, Alternative Investments, and Portfolio Management — with 100+ modules total.',
  },
  {
    question: 'Can I use this on mobile?',
    answer:
      'Absolutely. 1lasthour is fully responsive and works beautifully on phones, tablets, and desktops. Study on the go or at your desk.',
  },
  {
    question: 'How are the formulas displayed?',
    answer:
      'All mathematical formulas are rendered using KaTeX, the same engine used by Khan Academy and Notion. They look crisp, load instantly, and are accessible.',
  },
  {
    question: 'Will Level II and III be added?',
    answer:
      "Level II and Level III curriculum support is on the roadmap. We're focused on making Level 1 comprehensive before expanding.",
  },
];
