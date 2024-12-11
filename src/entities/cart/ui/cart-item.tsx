'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash } from 'lucide-react';

import { cn } from '@/shared/lib/tailwind-merge';

import { AddToFavoritesButton } from '@/features/update-favorites';
import { Checkbox } from '@/shared/ui/checkbox';

import { paths } from '@/shared/config/paths';

import type { ICartItemWithProduct } from '@/entities/cart';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

interface Props {
  classname?: string;
  item: ICartItemWithProduct;
  isOrder?: boolean;
  selectionProps?: {
    checked: boolean;
    selectedItems: number[];
    setSelectedItems: ([]: number[]) => void;
  };
  actions?: {
    updateCount: UseMutateFunction<
      AxiosResponse<unknown, unknown>,
      Error,
      {
        id: number;
        quantity: number;
      },
      unknown
    >;
    deleteFromCart: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, number, unknown>;
  };
}

export const CartItem = ({ classname, item, isOrder, selectionProps, actions }: Props) => {
  const { id, product, quantity } = item;

  const handleCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      selectionProps?.setSelectedItems([...selectionProps?.selectedItems, id]);
    } else {
      selectionProps?.setSelectedItems(selectionProps?.selectedItems.filter((el) => el !== id));
    }
  };

  const handleDelete = () => {
    actions?.deleteFromCart(id);
  };

  const handleDecrease = () => actions?.updateCount({ id, quantity: quantity - 1 });
  const handleIncrease = () => actions?.updateCount({ id, quantity: quantity + 1 });

  return (
    <div className={cn('py-4 [&:not(:last-child)]:border-b', classname)}>
      <div className="flex justify-end">
        {!isOrder && <AddToFavoritesButton id={id} isInFavorites={product.favorites.length > 0} />}
      </div>
      <div className="flex items-center gap-4">
        {!isOrder && (
          <Checkbox checked={selectionProps?.checked} onCheckedChange={handleCheckboxChange} />
        )}
        <Link href={paths.product + '/' + item.product.slug}>
          <div>
            <Image
              className="w-auto"
              src={product.images[0] || '/product-placeholder.webp'}
              alt="product"
              width={80}
              height={80}
            />
          </div>
        </Link>
        <div className="flex justify-between w-full">
          <div>
            <p className="text-sm">{product.title}</p>
            <p className="text-lg font-bold">{product.price.toLocaleString('ru')} ₸</p>
          </div>
        </div>
        {isOrder && <p className="font-bold">x{quantity}</p>}
      </div>
      <div className="flex justify-end">
        {!isOrder && (
          <div className="flex">
            {quantity === 1 ? (
              <div
                className="flex items-center justify-center p-2 cursor-pointer"
                onClick={handleDelete}>
                <Trash color="#8E979F" width={16} height={16} />
              </div>
            ) : (
              <div
                className="flex items-center justify-center p-2 cursor-pointer"
                onClick={handleDecrease}>
                <Minus color="#8E979F" width={16} height={16} />
              </div>
            )}
            <p className="flex items-center justify-center w-8 h-8 border rounded-lg">{quantity}</p>
            <div
              className="flex items-center justify-center p-2 cursor-pointer"
              onClick={handleIncrease}>
              <Plus color="#8E979F" width={16} height={16} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
