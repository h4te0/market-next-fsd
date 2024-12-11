import Link from 'next/link';

import { CheckoutBlock } from './checkout-block';
import { CheckoutCartItemSkeleton } from './checkout-cart-item-skeleton';
import { CartItem } from '@/entities/cart';

import { paths } from '@/shared/config/paths';
import type { ICartItemWithProduct } from '@/entities/cart';

interface Props {
  cart?: ICartItemWithProduct[];
  isLoading?: boolean;
}

export const CheckoutCartItems = ({ cart, isLoading }: Props) => {
  return (
    <CheckoutBlock
      title="1. Товары готовые к оформлению"
      endAdornment={
        <Link href={paths.cart} className="text-secondary">
          Вернуться в корзину
        </Link>
      }>
      <div className="flex flex-col px-6 max-h-[450px] overflow-scroll">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CheckoutCartItemSkeleton key={i} />)
          : cart?.map((item) => (
              <CartItem key={item.id} classname="py-1" isOrder={true} item={item} />
            ))}
      </div>
    </CheckoutBlock>
  );
};
