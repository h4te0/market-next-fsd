import { MenuPage } from '@/pages/menu';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Каталог',
};

const Menu = () => {
  return <MenuPage />;
};

export default Menu;
