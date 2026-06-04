import { ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Card, Badge } from '@components/ui';

// ─── Component ────────────────────────────────────────────────────────────────

const TopicListCard = memo(function TopicListCard({ topic, weight, path }) {
  return (
    <Link to={path || '#'} className="group block">
      <Card className="transition-all duration-200 hover:border-accent-emphasis hover:shadow-sm">
        <div className="mb-3 flex items-start justify-between">
          <Badge
            variant="default"
            className="border-border bg-surface font-semibold transition-colors text-ink-secondary group-hover:border-accent-muted group-hover:text-brand"
          >
            Weight: {weight}
          </Badge>
          <ArrowRight className="h-4 w-4 text-ink-tertiary transition-all group-hover:translate-x-1 group-hover:text-brand" />
        </div>

        <h3 className="mb-2 text-lg font-bold transition-colors text-ink group-hover:text-brand">
          {topic}
        </h3>

        <p className="line-clamp-2 leading-relaxed text-sm text-ink-secondary">
          {typeof topic === 'object' && topic.description
            ? topic.description
            : 'Master key concepts in this module.'}
        </p>
      </Card>
    </Link>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

TopicListCard.propTypes = {
  topic: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ description: PropTypes.string })])
    .isRequired,
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  path: PropTypes.string,
};

TopicListCard.defaultProps = {
  path: '#',
};

TopicListCard.displayName = 'TopicListCard';

export { TopicListCard };
export default TopicListCard;
