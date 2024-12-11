'use client';

import React from 'react';
import Image from 'next/image';

import { formatDate } from '@/shared/lib/formatters/format-date';

import { useOrders } from '@/entities/order';

import { OrdersEmpty } from './orders-empty';
import { OrderStatus } from './order-status';
import { Skeleton } from '@/shared/ui/skeleton';
import { Title } from '@/shared/ui/title';

import type { ICartItemWithProduct } from '@/entities/cart';

interface Props {}

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const MyOrders = ({}: Props) => {
  const { data: orders, isLoading } = useOrders();

  return (
    <div className="bg-white rounded-lg p-6 min-h-[740px]">
      <Title className="mb-4">Мои заказы</Title>
      <hr />
      <div className="max-h-[620px] overflow-y-auto">
        <table className="w-full">
          <tbody>
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
                <React.Fragment key={order.id}>
                  <tr className="flex items-center my-2">
                    <td className="basis-1/5 text-sm ">
                      <p className="font-bold">Заказ №{order.id}</p>
                      <p className="text-xs text-gray-400">
                        {formatDate(order.createdAt, dateOptions)}
                      </p>
                    </td>
                    <td className="basis-2/5 text-sm">
                      <div className="grid grid-cols-4 grid-rows gap-y-2">
                        {JSON.parse(String(order.items)).map((item: ICartItemWithProduct) => (
                          <div
                            className="flex items-center justify-center w-12 h-12 border rounded"
                            key={item.id}>
                            <Image
                              src={item.product.images[0] || '/product-placeholder.webp'}
                              alt="order item"
                              width={40}
                              height={40}
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="basis-1/5 text-sm font-bold">
                      {order.totalAmount.toLocaleString('ru')} ₸
                    </td>
                    <td className="basis-1/5 text-sm">x{JSON.parse(String(order.items)).length}</td>

                    <td className="basis-1/5 text-sm pr-2">
                      <OrderStatus status={order.status} />
                    </td>
                  </tr>
                  <tr className="border-b" />
                </React.Fragment>
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
