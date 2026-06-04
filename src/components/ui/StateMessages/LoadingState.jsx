import React from 'react';

import { Loader } from '../Loader';

export function LoadingState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Loader />
    </div>
  );
}
