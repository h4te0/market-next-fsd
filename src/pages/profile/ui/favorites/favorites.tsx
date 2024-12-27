'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

import { useFavorites } from '@/entities/favorites';
import { getNounByCount } from '@/shared/lib/get-noun-by-numb';
import { cn } from '@/shared/lib/tailwind-merge';

import { ProductItem } from '@/entities/product/ui/product-item';
import { FavoritesEmpty } from './favorites-empty';
import { Spinner } from '@/shared/ui/spinner';
import { Title } from '@/shared/ui/title';

import { paths } from '@/shared/config/paths';

interface Props {
  isOverview?: boolean;
  className?: string;
}

const FavoritesTitle = ({ isOverview }: Props) => {
  if (isOverview)
    return (
      <div className="mb-4 flex justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold phone:text-sm">
          <Heart color="#f97316" />
          Избранное
        </h2>
        <Link href={paths.profile.favorites} className="text-secondary tablet:hidden">
          Перейти в избранное
        </Link>
        <Link
          href={paths.profile.favorites}
          className="hidden text-secondary tablet:block absolute w-full h-full bottom-0 left-0"></Link>
      </div>
    );

  return <Title className="mb-4">Избранное</Title>;
};

export const Favorites = ({ isOverview, className }: Props) => {
  const { data: favorites, isLoading } = useFavorites();
  const isEmpty = !favorites?.length;

  if (isLoading)
    return (
      <div className={cn('bg-white rounded-lg p-6 min-h-full flex flex-col relative', className)}>
        <FavoritesTitle isOverview={isOverview} />
        <hr className="tablet:hidden" />
        <div className="h-[300px] tablet:h-auto">
          <Spinner />
        </div>
      </div>
    );

  if (isEmpty) {
    return (
      <div className={cn('bg-white rounded-lg p-6 min-h-full flex flex-col relative', className)}>
        <FavoritesTitle isOverview={isOverview} />
        <hr className="tablet:hidden" />
        <FavoritesEmpty className={isOverview ? 'h-[340px] tablet:h-auto' : ''} />
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-lg p-6 min-h-full flex flex-col relative', className)}>
      <FavoritesTitle isOverview={isOverview} />
      <hr className="tablet:hidden" />

      <div className="grid grid-cols-4 gap-4 mt-4 max-h-[440px] overflow-auto laptop:grid-cols-[repeat(auto-fill,minmax(170px,auto))] tablet:hidden">
        {favorites?.map((item) => (
          <ProductItem key={item.id} {...item.product} />
        ))}
      </div>
      {isOverview ? (
        <div className="hidden tablet:flex h-full justify-center items-center">
          <p className="text-gray-400 text-sm phone:text-xs">
            {getNounByCount(
              favorites.length,
              `${favorites.length} товар`,
              `${favorites.length} товара`,
              `${favorites.length} товаров`,
            )}
          </p>
        </div>
      ) : (
        <div className="hidden tablet:grid grid-cols-[repeat(auto-fill,minmax(170px,auto))] gap-2">
          {favorites?.map((item) => (
            <ProductItem key={item.id} {...item.product} />
          ))}
        </div>
      )}
    </div>
  );
};
