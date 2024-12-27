import { Topbar } from '@/widgets/header';
import { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Оформление заказа',
};

const CheckoutLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <main>
      <Topbar hasLogo={true} className="flex items-center h-[72px] w-full tablet:flex" />
      {children}
    </main>
  );
};

export default CheckoutLayout;
