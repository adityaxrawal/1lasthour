import { useLocation } from 'react-router-dom';

/**
 * Custom hook to generate breadcrumb data based on the current location.
 *
 * @returns {Array<{ label: string, url: string }>} Array of breadcrumb objects
 */
export const useBreadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return paths.map((path, index) => {
    const url = `/${paths.slice(0, index + 1).join('/')}`;

    // Format path for display (capitalize, replace hyphens)
    let label = path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Special case for abbreviations that should be all caps
    if (label.toLowerCase() === 'cfa') {
      label = 'CFA';
    }

    return { label, url };
  });
};
