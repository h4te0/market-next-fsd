'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { LogoutButton } from '@/features/update-user';

import { cn } from '@/shared/lib/tailwind-merge';

import { profileNavigation } from '../../config/profile-navigation';

import type { User } from '@prisma/client';

interface Props {
  user: User | null;
  className?: string;
}

export const ProfileNavMenu = ({ user, className }: Props) => {
  const pathname = usePathname();

  return (
    <nav className={cn(className)}>
      <ul>
        {profileNavigation.map((item) => (
          <li
            key={item.id}
            className={cn(
              item.path === pathname ? 'text-primary' : '',
              'bg-white px-4 flex first:rounded-t-2xl [&_a]:last:border-none',
            )}>
            <Link
              className="flex items-center text-sm leading-5 border-b py-4 w-full"
              href={item.path}>
              {item.icon}
              <span>{item.title}</span>
              <div className="w-6 h-6 flex items-center justify-center ml-auto">
                <ChevronRight width={20} height={20} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <li className="bg-white px-4 flex mt-2 rounded-b-2xl">
        <LogoutButton user={user} />
      </li>
    </nav>
  );
};
