'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

import { useFavorites } from '@/entities/favorites';

import { ProductItem } from '@/entities/product/ui/product-item';
import { FavoritesEmpty } from './favorites-empty';
import { Spinner } from '@/shared/ui/spinner';
import { Title } from '@/shared/ui/title';

import { paths } from '@/shared/config/paths';

interface Props {
  isOverview?: boolean;
}

const FavoritesTitle = ({ isOverview }: Props) => {
  if (isOverview)
    return (
      <div className="mb-4 flex justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Heart color="#f97316" />
          Избранное
        </h2>
        <Link href={paths.profile.favorites} className="text-secondary">
          Перейти в избранное
        </Link>
      </div>
    );

  return <Title className="mb-4">Избранное</Title>;
};

export const Favorites = ({ isOverview }: Props) => {
  const { data: wishlist, isLoading } = useFavorites();
  const isEmpty = !wishlist?.length;

  if (isLoading)
    return (
      <div className="bg-white rounded-lg p-6 min-h-full">
        <FavoritesTitle isOverview={isOverview} />
        <hr />
        <div className="h-[300px]">
          <Spinner />
        </div>
      </div>
    );

  if (isEmpty) {
    return (
      <div className="bg-white rounded-lg p-6 min-h-full">
        <FavoritesTitle isOverview={isOverview} />
        <hr />
        <FavoritesEmpty className={isOverview ? 'h-[340px]' : ''} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 min-h-full">
      <FavoritesTitle isOverview={isOverview} />
      <hr />

      <div className="grid grid-cols-4 gap-4 mt-4 max-h-[440px] overflow-auto">
        {wishlist?.map((item) => (
          <ProductItem key={item.id} {...item.product} />
        ))}
      </div>
    </div>
  );
};
