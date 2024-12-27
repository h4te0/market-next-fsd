import { Nunito } from 'next/font/google';

import { NprogressProvider, QueryProvider, ToastProvider } from '@/app/_providers';

import './globals.css';

const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '800', '1000'],
  subsets: ['latin', 'cyrillic'],
  style: 'normal',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={nunito.className + ' h-full'}>
        <QueryProvider>
          <NprogressProvider>
            <ToastProvider>{children}</ToastProvider>
          </NprogressProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
