import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Card } from '@components/ui';

const ModulesGrid = memo(function ModulesGrid({ topicData, topicId }) {
  return (
    <div className="min-w-0 flex-1">
      <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-brand">
        Learning Modules ({topicData.modules?.length || 0})
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {topicData.modules?.map((module, index) => (
          <Link
            key={module.id}
            to={`/cfa/level-1/${topicId}/${module.id}`}
            className="group block"
          >
            <Card hover className="h-full rounded-xl border-border p-6">
              <div className="flex gap-4">
                <div className="pt-1 text-2xl font-bold text-highlight">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink-tertiary">
                      Module {index + 1}
                    </span>
                    <ChevronRight className="h-4 w-4 text-ink-tertiary transition-transform group-hover:translate-x-1" />
                  </div>

                  <h3 className="mb-6 text-base font-bold leading-snug text-ink group-hover:text-brand">
                    {module.title}
                  </h3>

                  <div className="flex items-center gap-5 text-[13px] font-semibold text-brand">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" strokeWidth={2.5} />
                      <span className="text-ink-secondary">
                        {module.learningOutcomes?.reduce(
                          (acc, los) => acc + (los.concepts?.length || 0),
                          0
                        ) || 0}{' '}
                        Concepts
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" strokeWidth={2.5} />
                      <span className="text-ink-secondary">~{module.studyTime || '2h'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
});

ModulesGrid.propTypes = {
  topicData: PropTypes.object.isRequired,
  topicId: PropTypes.string.isRequired,
};

ModulesGrid.displayName = 'ModulesGrid';

export { ModulesGrid };
export default ModulesGrid;
