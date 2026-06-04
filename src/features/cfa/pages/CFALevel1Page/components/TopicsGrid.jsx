import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { TopicCard } from './TopicCard';

const TopicsGrid = memo(function TopicsGrid({ filteredTopics, basePath }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {filteredTopics.map((topic, index) => (
        <TopicCard key={topic.id} topic={topic} index={index} basePath={basePath} />
      ))}
    </div>
  );
});

TopicsGrid.propTypes = {
  filteredTopics: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
};

TopicsGrid.displayName = 'TopicsGrid';

export { TopicsGrid };
export default TopicsGrid;
