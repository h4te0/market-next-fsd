import { Header, Topbar } from '@/widgets/header';
import { Footer } from '@/shared/ui/footer';

import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="min-h-full flex flex-col">
      <Topbar />
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
