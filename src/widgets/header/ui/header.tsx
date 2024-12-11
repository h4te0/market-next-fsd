'use server';

import Link from 'next/link';

import { cn } from '@/shared/lib/tailwind-merge';

import { getCurrentUser } from '@/entities/user';

import { HeaderCatalogButton } from './header-catalog-button';
import { HeaderSearch } from './header-search';
import { HeaderNavigation } from './header-navigation';
import { Container } from '@/shared/ui/container';

import { paths } from '@/shared/config/paths';

interface Props {
  className?: string;
}

export const Header = async ({ className }: Props) => {
  const user = await getCurrentUser();

  return (
    <header className={cn('bg-white py-3  box-border sticky top-0 z-50 mb-4', className)}>
      <Container classname="flex items-center">
        <Link className="font-extrabold text-2xl mr-5" href={paths.home}>
          Market
        </Link>
        <HeaderCatalogButton />
        <HeaderSearch />
        <HeaderNavigation user={user} />
      </Container>
    </header>
  );
};
