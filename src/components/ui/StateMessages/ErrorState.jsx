import PropTypes from 'prop-types';
import React from 'react';

export function ErrorState({ title = 'Error loading data', message }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="rounded-md bg-red-50 dark:bg-highlight p-4 text-center text-red-600">
        <h3 className="mb-2 text-lg font-bold dark:text-[#0f172a]">{title}</h3>
        <p className="dark:text-black">{message}</p>
      </div>
    </div>
  );
}

ErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
};
