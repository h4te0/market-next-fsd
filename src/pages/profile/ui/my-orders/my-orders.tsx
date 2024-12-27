'use client';

import React from 'react';

import { useOrders } from '@/entities/order';

import { OrdersEmpty } from './orders-empty';
import { Skeleton } from '@/shared/ui/skeleton';
import { Title } from '@/shared/ui/title';

import { OrderItem } from './order-item';

export const MyOrders = () => {
  const { data: orders, isLoading } = useOrders();

  return (
    <div className="bg-white rounded-lg p-6 min-h-[740px]">
      <Title className="mb-4">Мои заказы</Title>
      <hr />
      <div className="max-h-[620px] overflow-y-auto">
        <table className="w-full">
          <tbody className="flex flex-col gap-2 h-4/5 overflow-y-auto">
            <tr className="flex items-center my-2">
              <th className="basis-1/6 text-xs text-gray-400">Номер заказа</th>
              <th className="basis-2/6 text-xs text-gray-400">Товары</th>
              <th className="basis-1/6 text-xs text-gray-400">Сумма</th>
              <th className="basis-1/6 text-xs text-gray-400">Количество</th>
              <th className="basis-1/6 text-xs text-gray-400">Статус</th>
            </tr>
            <tr className="border-b" />
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton className="h-[50px] my-2" />
                  </td>
                </tr>
              ))
            ) : orders?.length ? (
              orders?.map((order) => (
                <OrderItem key={order.id} order={order} className="border-none border-b" />
              ))
            ) : (
              <OrdersEmpty />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
