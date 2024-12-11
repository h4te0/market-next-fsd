import { MyOrders } from '@/pages/profile';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мои заказы',
};

const ProfileOrdersPage = () => {
  return <MyOrders />;
};

export default ProfileOrdersPage;
