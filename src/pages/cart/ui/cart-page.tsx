'use client';
import { useEffect, useState } from 'react';
import nProgress from 'nprogress';

import { CartItem, useCart } from '@/entities/cart';
import {
  useDeleteFromCart,
  useDeleteManyFromCart,
  useUpdateItemCount,
} from '@/features/update-cart';

import { CartEmpty } from './cart-empty';
import { CartSummary } from './cart-summary';
import { ClearCartButton, SelectAllCheckbox } from './select-all-checkbox';
import { Spinner } from '@/shared/ui/spinner';
import { Container } from '@/shared/ui/container';
import { Title } from '@/shared/ui/title';

export const CartPage = () => {
  const { data, isLoading, isFetching } = useCart();
  const { deleteManyFromCart, isPending: deleteManyPending } = useDeleteManyFromCart();
  const { updateCount, isPending: updatePending } = useUpdateItemCount();
  const { deleteFromCart, isPending: deletePending } = useDeleteFromCart();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const isPending = updatePending || deletePending || deleteManyPending || isFetching;

  useEffect(() => {
    if (isPending) nProgress.start();
    else nProgress.done();
  }, [isPending]);

  const handleSelectAll = (cartItemIds: number[]) => (checked: boolean) => {
    setSelectedItems(checked ? cartItemIds : []);
  };

  const handleClearCart = () => {
    deleteManyFromCart(selectedItems);
    setSelectedItems([]);
  };

  if (isLoading)
    return (
      <div className="h-[520px]">
        <Spinner size="large" />
      </div>
    );

  if (!data?.cart?.length) return <CartEmpty />;

  return (
    <Container>
      <Title size="lg" className="mb-4">
        Корзина
      </Title>
      <div className="flex justify-between">
        <div className="bg-white rounded-lg p-4 w-full max-w-[816px] h-fit mb-4">
          <div className="flex justify-between pb-4 border-b">
            <SelectAllCheckbox
              cartItemIds={[...data.cart.map((item) => item.id)]}
              checked={data.cart.length === selectedItems.length}
              onChange={handleSelectAll}
            />
            <ClearCartButton onClick={handleClearCart} count={selectedItems.length} />
          </div>
          {data.cart.map((item) => (
            <CartItem
              key={item.id}
              classname={isPending ? 'pointer-events-none opacity-40' : ''}
              item={item}
              selectionProps={{
                checked: selectedItems.some((el) => el === item.id),
                selectedItems,
                setSelectedItems,
              }}
              actions={{ updateCount, deleteFromCart }}
            />
          ))}
        </div>
        <CartSummary
          totalAmount={data.totalSum}
          quantity={data.totalCount}
          isDisabled={isPending}
        />
      </div>
    </Container>
  );
};
