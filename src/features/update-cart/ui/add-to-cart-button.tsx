'use client';

import Link from 'next/link';

import { useAddToCart } from '../api/use-add-to-cart';

import { Button } from '@/shared/ui/button';

import { paths } from '@/shared/config/paths';
import { cn } from '@/shared/lib/tailwind-merge';

interface Props {
  id: number;
  isInCart: boolean;
  className?: string;
}

export const AddToCartButton = ({ id, isInCart, className }: Props) => {
  const { addToCart, isPending, isSuccess } = useAddToCart();

  const addToCartHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    addToCart(id);
    e.stopPropagation();
  };

  if (isInCart || isSuccess)
    return (
      <Link href={paths.cart} className="w-full">
        <Button disabled={isPending} variant={'outlineActive'} className={cn('w-full', className)}>
          В корзину
        </Button>
      </Link>
    );

  return (
    <Button
      onClick={addToCartHandler}
      disabled={isPending}
      variant={'secondary'}
      className={cn('w-full', className)}>
      Добавить
    </Button>
  );
};
