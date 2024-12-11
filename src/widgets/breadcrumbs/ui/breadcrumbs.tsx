import React from 'react';
import Link from 'next/link';

import { getCurrentCategories } from '@/entities/category';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { paths } from '@/shared/config/paths';

interface Props {
  slug?: string;
  lastTitle?: string;
}

export const Breadcrumbs = async ({ slug, lastTitle }: Props) => {
  const currentCategories = await getCurrentCategories(slug);

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">Главная</Link>
        </BreadcrumbItem>
        {currentCategories?.map(
          (category, i) =>
            category.title && (
              <React.Fragment key={category.id}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {lastTitle || currentCategories.at(-1)?.title !== category.title ? (
                    <Link
                      href={`${paths.catalog}/${currentCategories
                        .map((category) => category.slug)
                        .slice(0, i + 1)
                        .join('/')}`}>
                      {category.title}
                    </Link>
                  ) : (
                    category.title
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ),
        )}
        {lastTitle && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{lastTitle}</BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
