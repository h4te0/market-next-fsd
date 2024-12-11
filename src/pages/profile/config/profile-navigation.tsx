import { Heart, Package, ShoppingBasket, User } from 'lucide-react';

import { paths } from '@/shared/config/paths';

export const profileNavigation = [
  {
    id: 1,
    title: 'Профиль',
    icon: <User className="mr-2" width={24} height={24} />,
    path: paths.profile.overview,
  },
  {
    id: 2,
    title: 'Мои заказы',
    icon: <Package className="mr-2" width={24} height={24} />,
    path: paths.profile.orders,
  },
  {
    id: 3,
    title: 'Избранное',
    icon: <Heart className="mr-2" width={24} height={24} />,
    path: paths.profile.favorites,
  },
  {
    id: 4,
    title: 'Корзина',
    icon: <ShoppingBasket className="mr-2" width={24} height={24} />,
    path: paths.cart,
  },
  // {
  //   id: 5,
  //   title: 'Мои карты',
  //   icon: <CreditCard className="mr-2" width={24} height={24} />,
  //   path: paths.profile.cards,
  // },
  // {
  //   id: 6,
  //   title: 'Мои адреса',
  //   icon: <MapPin className="mr-2" width={24} height={24} />,
  //   path: paths.profile.addressBook,
  // },
];
