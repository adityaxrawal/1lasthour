import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundState({ title, linkTo, linkText }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg text-ink">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <Link to={linkTo} className="text-brand transition-colors hover:text-brand-dark">
          {linkText}
        </Link>
      </div>
    </div>
  );
}

NotFoundState.propTypes = {
  title: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};
