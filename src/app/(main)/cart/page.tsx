import { CartPage } from '@/pages/cart';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Корзина',
};

const Cart = () => {
  return <CartPage />;
};

export default Cart;
