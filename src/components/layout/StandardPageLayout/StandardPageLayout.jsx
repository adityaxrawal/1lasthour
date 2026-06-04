import PropTypes from 'prop-types';
import React, { memo } from 'react';

// ─── Component ────────────────────────────────────────────────────────────────

import { BackButton, BreadcrumbItem } from './BreadcrumbsParts';

function BreadcrumbsList({ backPath, breadcrumbs }) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;
  
  return (
    <div className="flex items-center gap-2">
      {backPath ? <div className="h-4 w-px bg-border-default" /> : null}
      {breadcrumbs.map((crumb, idx) => (
        <BreadcrumbItem 
          key={idx} 
          crumb={crumb} 
          idx={idx} 
          isLast={idx === breadcrumbs.length - 1} 
        />
      ))}
    </div>
  );
}

function PageBreadcrumbs({ backPath, breadcrumbs }) {
  const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;

  if (!backPath && !hasBreadcrumbs) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 text-sm text-ink-secondary">
      <BackButton backPath={backPath} />
      <BreadcrumbsList backPath={backPath} breadcrumbs={breadcrumbs} />
    </div>
  );
}

const HeaderIcon = ({ icon }) => {
  if (!icon) return null;
  return (
    <div className="rounded-lg border border-border bg-surface p-3 text-ink">
      {icon}
    </div>
  );
};

const HeaderDescription = ({ description }) => {
  if (!description) return null;
  return (
    <p className="max-w-3xl text-lg leading-relaxed text-ink-secondary">{description}</p>
  );
};

const HeaderStats = ({ stats }) => {
  if (!stats) return null;
  return <div className="pt-2">{stats}</div>;
};

const HeaderActions = ({ actions }) => {
  if (!actions) return null;
  return <div className="flex items-center gap-3">{actions}</div>;
};

function PageHeader({ icon, title, description, stats, actions }) {
  return (
    <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-start md:justify-between">
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4">
          <HeaderIcon icon={icon} />
          <div>
            <h1 className="font-bold text-3xl tracking-tight text-ink">{title}</h1>
          </div>
        </div>
        <HeaderDescription description={description} />
        <HeaderStats stats={stats} />
      </div>

      <HeaderActions actions={actions} />
    </div>
  );
}

const StandardPageLayout = memo(function StandardPageLayout({
  title,
  description,
  icon,
  breadcrumbs = [],
  actions,
  stats,
  sidebar,
  children,
  backPath,
}) {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <PageBreadcrumbs backPath={backPath} breadcrumbs={breadcrumbs} />
        <PageHeader 
          icon={icon} 
          title={title} 
          description={description} 
          stats={stats} 
          actions={actions} 
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Column */}
        <div className="min-w-0 flex-1 space-y-8">{children}</div>

        {/* Sidebar Column */}
        {sidebar && (
          <div className="flex-shrink-0 space-y-6 lg:w-80">
            <div className="sticky top-24 space-y-6">{sidebar}</div>
          </div>
        )}
      </div>
    </div>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

StandardPageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string.isRequired,
    })
  ),
  actions: PropTypes.node,
  stats: PropTypes.node,
  sidebar: PropTypes.node,
  children: PropTypes.node.isRequired,
  backPath: PropTypes.string,
};

StandardPageLayout.defaultProps = {
  description: '',
  icon: null,
  breadcrumbs: [],
  actions: null,
  stats: null,
  sidebar: null,
  backPath: '',
};

StandardPageLayout.displayName = 'StandardPageLayout';

export { StandardPageLayout };
export default StandardPageLayout;
