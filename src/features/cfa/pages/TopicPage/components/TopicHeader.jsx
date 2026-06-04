import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { Badge } from '@components/ui';

const TopicHeader = memo(function TopicHeader({ topicData }) {
  return (
    <header className="border-b border-border pb-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <Badge
            variant="secondary"
            className="mb-4 rounded-full bg-brand/10 px-3 py-1 font-bold text-brand hover:bg-brand/20"
          >
            {topicData.weight}
          </Badge>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            {topicData.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-ink-secondary">
            {topicData.description ||
              `Covers statistical and mathematical tools used in financial analysis, including return measurement, time value of money, statistics, probability, portfolio mathematics, simulation, sampling, hypothesis testing, regression, and big data techniques.`}
          </p>
        </div>
      </div>
    </header>
  );
});

TopicHeader.propTypes = {
  topicData: PropTypes.object.isRequired,
};

TopicHeader.displayName = 'TopicHeader';

export { TopicHeader };
export default TopicHeader;
