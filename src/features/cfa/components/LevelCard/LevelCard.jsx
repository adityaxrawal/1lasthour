import { ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Card, Badge } from '@components/ui';

// ─── Component ────────────────────────────────────────────────────────────────

const LevelCard = memo(function LevelCard({ title, description, path, icon: Icon, status }) {
  const isActive = status === 'Active';

  return (
    <Link to={path} className={`group block ${!isActive ? 'pointer-events-none opacity-80' : ''}`}>
      <Card className="h-full transition-all duration-200 hover:border-accent-emphasis hover:shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`rounded-md border p-2 transition-colors ${
              isActive
                ? 'border-accent-muted bg-brand-subtle text-brand'
                : 'border-border bg-surface text-ink-secondary'
            }`}
          >
            {Icon && <Icon className="h-6 w-6" />}
          </div>
          <Badge variant={isActive ? 'success' : 'default'}>{status}</Badge>
        </div>

        <h2 className="mb-2 text-xl font-bold transition-colors text-ink group-hover:text-brand">
          {title}
        </h2>
        <p className="mb-6 leading-relaxed text-sm text-ink-secondary">{description}</p>

        {isActive && (
          <div className="mt-auto flex items-center text-sm font-medium transition-transform text-brand group-hover:translate-x-1">
            Explore Resources <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        )}
      </Card>
    </Link>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

LevelCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  path: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  status: PropTypes.string.isRequired,
};

LevelCard.defaultProps = {
  description: '',
  icon: null,
};

LevelCard.displayName = 'LevelCard';

export { LevelCard };
export default LevelCard;
