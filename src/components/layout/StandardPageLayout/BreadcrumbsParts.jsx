import { ArrowLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function BackButton({ backPath }) {
  const navigate = useNavigate();
  if (!backPath) return null;

  return (
    <button
      type="button"
      onClick={() => navigate(backPath)}
      className="flex items-center gap-1 transition-colors hover:text-ink"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}

export function BreadcrumbItem({ crumb, idx, isLast }) {
  return (
    <div className="flex items-center gap-2">
      {idx > 0 && <ChevronRight className="h-4 w-4 text-ink-tertiary" />}
      {crumb.path ? (
        <Link to={crumb.path} className="transition-colors hover:text-ink">
          {crumb.label}
        </Link>
      ) : (
        <span className={isLast ? 'font-medium text-ink' : ''}>{crumb.label}</span>
      )}
    </div>
  );
}
