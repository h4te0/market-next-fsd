'use client';

import { useState } from 'react';
import { Home, TextSearch } from 'lucide-react';
import Link from 'next/link';

import { useCart } from '@/entities/cart';
import { useFavorites } from '@/entities/favorites';
import { LogoutButton } from '@/features/update-user';

import { cn } from '@/shared/lib/tailwind-merge';

import { AuthModal } from '@/widgets/auth';

import { HeaderProfileButton } from './header-profile-button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';
import { Burger } from '@/shared/ui/burger';
import { CurrentCity } from '@/shared/ui/current-city';
import { NavCountBadge } from '@/shared/ui/nav-count-badge';

import { headerNavigation } from '../config/header-navigation';
import { paths } from '@/shared/config/paths';

import type { User } from '@prisma/client';

interface Props {
  user: User | null;
  className?: string;
}

export const MobileNavBar = ({ user, className }: Props) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { data: cart } = useCart();
  const { data: favorites } = useFavorites();
  return (
    <ul
      className={cn(
        'bg-white fixed w-full h-16 bottom-0 left-0 box-border px-3 border-t grid grid-cols-5 items-center justify-center',
        className,
      )}>
      <Link href={paths.home} className="flex flex-col items-center mx-1">
        <Home />
        <p className="whitespace-nowrap text-[12px]">Главная</p>
      </Link>
      <Link href={paths.menu} className="flex flex-col items-center mx-1">
        <TextSearch />
        <p className="whitespace-nowrap text-[12px]">Каталог</p>
      </Link>
      {headerNavigation.map(
        (item) =>
          item.title !== 'Мои заказы' && (
            <Link href={item.path} className="flex flex-col items-center mx-1" key={item.id}>
              <div className="relative">
                {item.icon}
                {item.isCart && cart?.totalCount && <NavCountBadge count={cart?.totalCount} />}
                {item.isFavorites && !!favorites?.length && (
                  <NavCountBadge count={favorites?.length} />
                )}
              </div>
              <p className="whitespace-nowrap text-[12px]">{item.title}</p>
            </Link>
          ),
      )}
      <HeaderProfileButton
        user={user}
        className="text-[12px]"
        onClickSignIn={() => setOpenAuthModal(true)}
      />
      <AuthModal isOpen={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </ul>
  );
};

export const MobileSidebar = ({ user }: Props) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { data: cart } = useCart();
  const { data: favorites } = useFavorites();

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Burger className="hidden tablet:block" />
        </SheetTrigger>
        <SheetContent>
          <div className="h-full flex flex-col">
            <SheetTitle>
              <CurrentCity />
            </SheetTitle>
            <hr className="my-8" />
            <ul className="flex flex-col">
              {headerNavigation.map((item) => (
                <Link key={item.id} href={item.path}>
                  <SheetClose>
                    <li className="flex gap-4 py-4">
                      <div className="relative">
                        {item.icon}
                        {item.isCart && cart?.totalCount && (
                          <NavCountBadge count={cart?.totalCount} />
                        )}
                        {item.isFavorites && !!favorites?.length && (
                          <NavCountBadge count={favorites?.length} />
                        )}
                      </div>
                      <p>{item.title}</p>
                    </li>
                  </SheetClose>
                </Link>
              ))}
            </ul>
            <LogoutButton user={user} className="mt-auto" />
          </div>
        </SheetContent>
      </Sheet>
      <AuthModal isOpen={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </>
  );
};
