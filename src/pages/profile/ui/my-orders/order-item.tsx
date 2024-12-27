import Image from 'next/image';

import { formatDate } from '@/shared/lib/formatters';
import { cn } from '@/shared/lib/tailwind-merge';

import { OrderStatus } from './order-status';

import type { ICartItemWithProduct } from '@/entities/cart';
import type { Order } from '@prisma/client';

interface Props {
  order: Order;
  className?: string;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const OrderItem = ({ order, className }: Props) => {
  return (
    <>
      <tr className={cn('border rounded p-2', className)} key={order.id}>
        <td className="flex justify-between items-center mb-2">
          <div>
            <p className="font-bold text-sm">Заказ №{order.id}</p>
            <p className="text-xs text-gray-400">{formatDate(order.createdAt, dateOptions)}</p>
          </div>
          <p className="font-bold text-sm">{order.totalAmount.toLocaleString('ru')} ₸</p>
        </td>
        <td className="flex justify-between items-center">
          <OrderStatus status={order.status} classname="text-xs w-fit h-fit" />
          <div className="flex gap-2 max-w-[240px] overflow-x-auto tablet:no-scrollbar">
            {JSON.parse(String(order.items)).map((item: ICartItemWithProduct) => (
              <div
                className="flex items-center justify-center w-12 h-12 border rounded aspect-square"
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
      </tr>
    </>
  );
};
