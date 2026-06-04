import React from 'react';
import PropTypes from 'prop-types';

import { LOSTabSection } from './LOSTabSection';
import { LegacyModuleLayout } from './LegacyModuleLayout';

export function MainContent({ hasLOSData, moduleId, moduleData }) {
  if (hasLOSData) {
    return <LOSTabSection key={moduleId} learningOutcomes={moduleData.learningOutcomes} />;
  }
  return <LegacyModuleLayout moduleData={moduleData} />;
}

MainContent.propTypes = {
  hasLOSData: PropTypes.bool.isRequired,
  moduleId: PropTypes.string.isRequired,
  moduleData: PropTypes.object.isRequired,
};
