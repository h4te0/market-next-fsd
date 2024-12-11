import Link from 'next/link';

import { paths } from '@/shared/config/paths';

import { Container } from '@/shared/ui/container';
import { Title } from '@/shared/ui/title';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const footerNav = [
  {
    title: 'Профиль',
    path: paths.profile.overview,
  },
  {
    title: 'Корзина',
    path: paths.cart,
  },
  {
    title: 'Избранное',
    path: paths.profile.favorites,
  },
  {
    title: 'Мои заказы',
    path: paths.profile.orders,
  },
];

const footerNews = [
  {
    title: 'Акции',
    path: '#',
  },
  {
    title: 'Новости',
    path: '#',
  },
  {
    title: 'Блог',
    path: '#',
  },
  {
    title: 'Контакты',
    path: '#',
  },
  {
    title: 'Наши магазины',
    path: '#',
  },
];

export const Footer = () => {
  return (
    <footer className="bg-white mt-4">
      <Container>
        <div className="grid grid-cols-3 py-8">
          <div className="flex flex-col gap-4">
            <Link className="font-extrabold text-5xl" href={paths.home}>
              Market
            </Link>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex justify-center items-center border p-1 border-gray-500 rounded-full">
                <Instagram width={18} height={18} color="#6b7280" />
              </a>
              <a
                href="#"
                className="flex justify-center items-center border p-1 border-gray-500 rounded-full">
                <Twitter width={18} height={18} color="#6b7280" />
              </a>
              <a
                href="#"
                className="flex justify-center items-center border p-1 border-gray-500 rounded-full">
                <Facebook width={18} height={18} color="#6b7280" />
              </a>
            </div>
          </div>
          <div>
            <Title>Интернет-магазин</Title>
            <ul className="flex flex-col gap-4 mt-2">
              {footerNews.map((item, i) => (
                <li className="text-sm text-gray-500" key={i}>
                  <Link href={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Title>Навигация</Title>
            <ul className="flex flex-col gap-4 mt-2">
              {footerNav.map((item, i) => (
                <li className="text-sm text-gray-500" key={i}>
                  <Link href={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <div className="flex justify-center py-2 border-t">
        <p className="text-sm text-gray-400 font-bold">© Market 2024</p>
      </div>
    </footer>
  );
};