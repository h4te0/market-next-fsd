import type { Metadata } from 'next';

import { CartPage } from '@/pages/cart';

export const metadata: Metadata = {
  title: 'Корзина',
};

const Cart = () => {
  return <CartPage />;
};

export default Cart;
