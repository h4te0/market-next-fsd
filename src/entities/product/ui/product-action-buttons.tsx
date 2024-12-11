'use client';

import { AddToCartButton } from '@/features/update-cart';
import { AddToFavoritesButton } from '@/features/update-favorites';

import type { Cart } from '@prisma/client';

interface Props {
  cartItems?: Cart[];
  id: number;
  isInFavorites: boolean;
}

export const ProductActionButtons = ({ cartItems, id, isInFavorites }: Props) => {
  return (
    <>
      <AddToCartButton id={id} isInCart={!!cartItems?.length} />
      <AddToFavoritesButton id={id} isInFavorites={isInFavorites} />
    </>
  );
};
