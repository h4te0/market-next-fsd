'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const NprogressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#F97316"
        // disableSameURL={false}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
