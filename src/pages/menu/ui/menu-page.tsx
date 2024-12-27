'use client';
import { useCategories } from '@/entities/category';
import { paths } from '@/shared/config/paths';
import { Container } from '@/shared/ui/container';
import { Skeleton } from '@/shared/ui/skeleton';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const MenuPage = () => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading)
    return (
      <Container>
        <ul className="flex flex-col gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="rounded-lg h-16" />
          ))}
        </ul>
      </Container>
    );

  return (
    <Container>
      <ul className="flex flex-col gap-2">
        {categories?.map((category) => (
          <li key={category.id} className="bg-white rounded-lg p-2 pr-4 text-sm font-bold">
            <Link
              href={`${paths.menu}/${category.slug}`}
              className="flex items-center justify-between ">
              <div className="flex gap-4 items-center">
                <Image src={category.image || ''} alt="category" width={48} height={48} />
                <p>{category.title}</p>
              </div>
              <ChevronRight width={16} height={16} />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};
