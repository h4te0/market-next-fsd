import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';

import { cn } from '@/shared/lib/tailwind-merge';

import { Container } from '@/shared/ui/container';

import { paths } from '@/shared/config/paths';
import { Logo } from '@/shared/ui/logo';
import { CurrentCity } from '@/shared/ui/current-city';

interface Props {
  className?: string;
  hasLogo?: boolean;
}

export const Topbar = ({ className, hasLogo }: Props) => {
  return (
    <div
      className={cn(
        'relative box-border bg-white border-b border-[#f4f4f4] py-2 tablet:hidden',
        className,
      )}>
      <Container classname="flex items-center justify-between w-full">
        <div className="flex gap-7 tablet:justify-between tablet:w-full">
          {hasLogo && <Logo />}
          <CurrentCity />
        </div>
        <div className="flex items-center justify-between tablet:hidden">
          <div className="flex items-center">
            <Phone width={20} height={20} />
            <span className="text-secondary px-2 font-bold text-lg">1818</span>{' '}
            <p className="text-sm">с 9:00 до 22:00 ежедневно</p>
          </div>
        </div>
      </Container>
    </div>
  );
};
