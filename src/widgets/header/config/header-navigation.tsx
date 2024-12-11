import { Heart, Package, ShoppingBasket } from 'lucide-react';

import { paths } from '@/shared/config/paths';

export const headerNavigation = [
  { id: 1, title: 'Избранное', icon: <Heart />, path: paths.profile.favorites, isFavorites: true },
  {
    id: 2,
    title: 'Мои заказы',
    icon: <Package />,
    path: paths.profile.orders,
    isAuthRequired: true,
  },
  { id: 3, title: 'Корзина', icon: <ShoppingBasket />, path: paths.cart, isCart: true },
];
