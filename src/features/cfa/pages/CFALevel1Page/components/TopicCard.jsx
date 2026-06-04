import { BookOpen, Clock } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Card } from '@components/ui';

const TopicCardHeader = ({ index, icon: Icon }) => (
  <div className="mb-6 flex items-center justify-between">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-lg font-bold text-brand-bright">
      {String(index + 1).padStart(2, '0')}
    </div>
    {Icon && (
      <div className="text-highlight">
        <Icon className="h-7 w-7 stroke-[1.5]" />
      </div>
    )}
  </div>
);

TopicCardHeader.propTypes = {
  index: PropTypes.number.isRequired,
  icon: PropTypes.elementType,
};

const TopicCardContent = ({ title, description }) => (
  <>
    <h3 className="mb-3 line-clamp-2 text-lg font-bold text-ink transition-colors group-hover:text-brand-bright">
      {title}
    </h3>
    <p className="mb-8 line-clamp-3 flex-1 text-sm text-ink-secondary">
      {description || `Explore concepts, formulas, and exam strategies for ${title}.`}
    </p>
  </>
);

TopicCardContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

const TopicCardMeta = ({ modules, studyHours, weight }) => (
  <div className="flex items-center justify-between pt-4 text-xs font-medium text-ink-secondary">
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-1.5">
        <BookOpen className="h-4 w-4" />
        {modules?.length || 0} Modules
      </span>
      <span className="flex items-center gap-1.5">
        <Clock className="h-4 w-4" />
        {studyHours || '~20h'}
      </span>
    </div>
    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-ink-secondary">
      {weight}
    </span>
  </div>
);

TopicCardMeta.propTypes = {
  modules: PropTypes.array,
  studyHours: PropTypes.string,
  weight: PropTypes.string,
};

const TopicCard = memo(function TopicCard({ topic, index, basePath }) {
  return (
    <Link to={`${basePath}/${topic.id}`} className="group block">
      <Card hover className="flex h-full flex-col p-6">
        <TopicCardHeader index={index} icon={topic.icon} />
        <TopicCardContent title={topic.title} description={topic.description} />
        <TopicCardMeta 
          modules={topic.modules} 
          studyHours={topic.studyHours} 
          weight={topic.weight} 
        />
      </Card>
    </Link>
  );
});

TopicCard.propTypes = {
  topic: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  basePath: PropTypes.string.isRequired,
};

TopicCard.displayName = 'TopicCard';

export { TopicCard };
export default TopicCard;
