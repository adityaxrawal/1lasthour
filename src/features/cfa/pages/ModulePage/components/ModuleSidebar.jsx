import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { SidebarNavigation } from './SidebarNavigation';
import { SidebarRelated } from './SidebarRelated';
import { SidebarTOC } from './SidebarTOC';

const ModuleSidebar = memo(function ModuleSidebar({
  topicData,
  moduleId,
  topicId,
  basePath,
  hasLOSData,
  moduleData,
  relatedTopics,
}) {
  return (
    <aside className="shrink-0 space-y-8 lg:w-72">
      {/* Module Navigation */}
      <SidebarNavigation
        topicData={topicData}
        basePath={basePath}
        topicId={topicId}
        moduleId={moduleId}
      />

      {/* Quick Navigation */}
      <SidebarTOC hasLOSData={hasLOSData} moduleData={moduleData} />

      {/* Related */}
      <SidebarRelated relatedTopics={relatedTopics} basePath={basePath} />
    </aside>
  );
});

ModuleSidebar.propTypes = {
  topicData: PropTypes.object.isRequired,
  moduleId: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  hasLOSData: PropTypes.bool.isRequired,
  moduleData: PropTypes.object.isRequired,
  relatedTopics: PropTypes.array.isRequired,
};

ModuleSidebar.displayName = 'ModuleSidebar';

export { ModuleSidebar };
export default ModuleSidebar;
