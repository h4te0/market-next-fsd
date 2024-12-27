'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/tailwind-merge';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

import { paths } from '@/shared/config/paths';
import { profileNavigation } from '../config/profile-navigation';

interface Props {
  className?: string;
}

export const ProfileBreadcrumbs = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <Breadcrumb className={cn('mb-4', className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href={paths.home}>Главная</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={paths.profile.overview}>Личный кабинет</Link>
        </BreadcrumbItem>
        {profileNavigation.map(
          (item) =>
            item.path === pathname && (
              <React.Fragment key={item.id}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{item.title}</BreadcrumbItem>
              </React.Fragment>
            ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
