import Link from 'next/link';
import Image from 'next/image';
import { Package } from 'lucide-react';

import { useOrders } from '@/entities/order';
import { formatDate } from '@/shared/lib/formatters/format-date';
import { cn } from '@/shared/lib/tailwind-merge';

import { MyOrdersEmpty } from './my-orders-empty';
import { OrderStatus } from '../../my-orders/order-status';
import { Spinner } from '@/shared/ui/spinner';

import { paths } from '@/shared/config/paths';

import type { ICartItemWithProduct } from '@/entities/cart';
import { getNounByCount } from '@/shared/lib/get-noun-by-numb';
import { OrderItem } from '../../my-orders/order-item';

interface Props {
  className?: string;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const MyOrdersBlock = ({ className }: Props) => {
  const { data: orders, isLoading } = useOrders();

  return (
    <div
      className={cn(
        'bg-white p-6 w-full rounded-lg max-h-[272px] flex flex-col relative',
        className,
      )}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-lg font-bold phone:text-sm">
          <Package color="#f97316" />
          Мои заказы
        </h2>
        <Link href={paths.profile.orders} className="text-secondary tablet:hidden">
          Перейти в мои заказы
        </Link>
        <Link
          href={paths.profile.orders}
          className="hidden text-secondary tablet:block absolute w-full h-full bottom-0 left-0"></Link>
      </div>
      {isLoading ? (
        <Spinner containerClassName="h-4/5" />
      ) : orders?.length ? (
        <>
          <table>
            <tbody className="tablet:hidden flex flex-col gap-2 h-4/5 overflow-y-auto">
              {orders?.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </tbody>
          </table>
          <div className="hidden tablet:flex h-full justify-center items-center">
            <p className="text-gray-400 text-sm phone:text-xs">
              {getNounByCount(
                orders.length,
                `${orders.length} заказ`,
                `${orders.length} заказа`,
                `${orders.length} заказов`,
              )}
            </p>
          </div>
        </>
      ) : (
        <MyOrdersEmpty />
      )}
    </div>
  );
};
