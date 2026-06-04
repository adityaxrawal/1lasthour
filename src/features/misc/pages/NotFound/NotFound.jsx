import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 text-center bg-bg text-ink">
      <h1 className="text-6xl md:text-8xl font-bold mb-4 font-mono tracking-tighter text-ink">
        <span className="text-brand">404</span>
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-6">Page Not Found</h2>

      <p className="text-ink-secondary max-w-lg mb-10 text-lg">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>

      <Link to="/">
        <Button variant="primary" size="lg" icon={Home}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
