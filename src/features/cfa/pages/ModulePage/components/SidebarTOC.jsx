import { BookOpen } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { getTOCItems } from '@/utils/tocHelpers';

const SidebarTOC = memo(function SidebarTOC({ hasLOSData, moduleData }) {
  const items = React.useMemo(() => getTOCItems(hasLOSData, moduleData), [hasLOSData, moduleData]);

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-secondary">
        <BookOpen className="h-4 w-4 text-brand" />
        On This Page
      </h3>
      <ul className="space-y-3 text-sm list-disc pl-5 marker:text-ink-tertiary">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`transition-colors text-ink-secondary hover:text-brand ${item.className || ''}`.trim()}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});

SidebarTOC.propTypes = {
  hasLOSData: PropTypes.bool.isRequired,
  moduleData: PropTypes.object.isRequired,
};

SidebarTOC.displayName = 'SidebarTOC';

export { SidebarTOC };
export default SidebarTOC;
