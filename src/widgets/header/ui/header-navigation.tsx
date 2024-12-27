'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { useFavorites } from '@/entities/favorites';
import { useCart } from '@/entities/cart';

import { cn } from '@/shared/lib/tailwind-merge';

import { AuthModal } from '@/widgets/auth';
import { HeaderProfileButton } from './header-profile-button';
import { NavCountBadge } from '@/shared/ui/nav-count-badge';

import { headerNavigation } from '../config/header-navigation';

import type { User } from '@prisma/client';

interface Props {
  user: User | null;
  className?: string;
}

export const HeaderNavigation = ({ user, className }: Props) => {
  const { data: cart } = useCart();
  const { data: favorites } = useFavorites();

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = '';

    if (searchParams?.has('verified')) {
      toastMessage =
        'Почта успешно подтверждена! Теперь вы можете авторизоваться под подтверждённой почтой';
    }
    if (searchParams?.has('paid')) {
      toastMessage =
        'Заказ оформлен! Подробнее в письме отправленном на почту или в разделе "Мои заказы"';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, { duration: 15000 });
      }, 300);
    }
  }, []);

  return (
    <nav className={cn('flex gap-4', className)}>
      {headerNavigation.map(
        (item) =>
          (!item.isAuthRequired || !!item.isAuthRequired === !!user) && (
            <Link
              key={item.id}
              href={item.path}
              className="flex flex-col items-center hover:text-primary duration-300 ease-in-out">
              <div className="relative">
                {item.icon}
                {item.isCart && cart?.totalCount && <NavCountBadge count={cart?.totalCount} />}
                {item.isFavorites && !!favorites?.length && (
                  <NavCountBadge count={favorites?.length} />
                )}
              </div>
              <p className="whitespace-nowrap">{item.title}</p>
            </Link>
          ),
      )}
      <HeaderProfileButton user={user} onClickSignIn={() => setOpenAuthModal(true)} />
      <AuthModal isOpen={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </nav>
  );
};
