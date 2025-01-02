import Link from 'next/link';
import { LucideUser } from 'lucide-react';

import { cn } from '@/shared/lib/tailwind-merge';

import { paths } from '@/shared/config/paths';

import type { User } from '@prisma/client';

interface Props {
  user: User | null;
  onClickSignIn?: () => void;
  className?: string;
}

export const HeaderProfileButton = ({ user, onClickSignIn, className }: Props) => {
  return user ? (
    <Link
      href={paths.profile.overview}
      className={cn(
        'flex flex-col items-center hover:text-primary duration-200 ease-in-out',
        className,
      )}>
      <LucideUser />
      <span className="whitespace-nowrap overflow-hidden max-w-full text-ellipsis">
        {user.fullName || 'Профиль'}
      </span>
    </Link>
  ) : (
    <div
      className={cn(
        'flex flex-col items-center hover:text-primary duration-200 ease-in-out cursor-pointer',
        className,
      )}
      onClick={onClickSignIn}>
      <LucideUser />
      <span>Вход</span>
    </div>
  );
};
