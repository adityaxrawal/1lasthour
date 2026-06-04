export const APP_NAV_LINKS = [
  { path: '/cfa', label: 'All Curriculums' },
  { path: '/cfa/level-1', label: 'Level I' },
];

export const checkIsActive = (pathname, linkPath) => {
  return pathname === linkPath || (linkPath !== '/' && pathname.startsWith(linkPath));
};
