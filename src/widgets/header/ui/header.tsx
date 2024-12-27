'use server';

import { cn } from '@/shared/lib/tailwind-merge';

import { getCurrentUser } from '@/entities/user';

import { HeaderCatalogButton } from './header-catalog-button';
import { HeaderSearch } from './header-search';
import { HeaderNavigation } from './header-navigation';
import { MobileSidebar, MobileNavBar } from './header-mobile-navigation';

import { Container } from '@/shared/ui/container';
import { Logo } from '@/shared/ui/logo';
import { CurrentCity } from '@/shared/ui/current-city';

interface Props {
  className?: string;
}

export const Header = async ({ className }: Props) => {
  const user = await getCurrentUser();

  return (
    <header className={cn('bg-white py-3  box-border sticky top-0 z-50 mb-4', className)}>
      <Container classname="flex items-center tablet:justify-between tablet:h-14">
        <CurrentCity className="hidden tablet:flex" />
        <Logo className="tablet:absolute tablet:left-0 tablet:right-0 tablet:ms-auto tablet:me-auto tablet:w-fit" />
        <MobileSidebar user={user} />

        <HeaderCatalogButton className="tablet:hidden" />
        <HeaderSearch className="tablet:hidden" />
        <HeaderNavigation user={user} className="tablet:hidden" />
      </Container>

      <Container classname="hidden tablet:flex tablet:py-2 ">
        <HeaderSearch className="" />
      </Container>

      <MobileNavBar user={user} className="hidden tablet:grid" />
    </header>
  );
};
