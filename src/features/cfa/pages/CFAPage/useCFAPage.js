import { BookOpen, TrendingUp, Award } from 'lucide-react';
import { useMemo } from 'react';

export function useCFAPage() {
  const levels = useMemo(
    () => [
      {
        level: 1,
        title: 'CFA Level I',
        description: 'Knowledge and comprehension of investment tools.',
        path: '/cfa/level-1',
        icon: BookOpen,
        status: 'Active',
      },
      {
        level: 2,
        title: 'CFA Level II',
        description: 'Application of tools and analysis of asset valuation.',
        path: '#',
        icon: TrendingUp,
        status: 'Coming Soon',
      },
      {
        level: 3,
        title: 'CFA Level III',
        description: 'Portfolio management and wealth planning.',
        path: '#',
        icon: Award,
        status: 'Coming Soon',
      },
    ],
    []
  );

  return { levels };
}
