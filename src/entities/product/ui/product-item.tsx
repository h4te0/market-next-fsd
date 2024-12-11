'use client';

import Image from 'next/image';
import { useRouter } from 'next-nprogress-bar';

import { ProductActionButtons } from './product-action-buttons';

import type { IProductWithCartAndFav } from '../types';

export const ProductItem = (props: IProductWithCartAndFav) => {
  const { id, title, price, images, cart, favorites, slug } = props;

  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/product/${slug}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="border bg-white flex flex-col justify-between px-4 py-4 rounded-lg box-border w-full hover:drop-shadow-lg duration-300 ease-out cursor-pointer">
      <div>
        <div className="h-[202px] flex items-center justify-center">
          <Image
            src={images[0] || '/product-placeholder.webp'}
            alt="product"
            width={150}
            height={150}
            priority={true}
          />
        </div>
        <div className="my-3">
          <p className="line-clamp-2 text-sm">{title}</p>
          <p className="mt-2 text-base font-bold">{price.toLocaleString('ru')} ₸</p>
        </div>
      </div>
      <div className="flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
        <ProductActionButtons cartItems={cart} id={id} isInFavorites={favorites?.length > 0} />
      </div>
    </div>
  );
};
