'use client';

import toast, { Toaster, ToastBar } from 'react-hot-toast';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 10000 }}>
        {(t) => (
          <div onClick={() => toast.dismiss(t.id)} className="cursor-pointer">
            <ToastBar toast={t} position="top-right" />
          </div>
        )}
      </Toaster>
    </>
  );
};
