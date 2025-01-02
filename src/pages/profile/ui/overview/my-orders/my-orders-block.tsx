import Link from 'next/link';
import { Package } from 'lucide-react';

import { useOrders } from '@/entities/order';
import { cn } from '@/shared/lib/tailwind-merge';
import { getNounByCount } from '@/shared/lib/get-noun-by-numb';

import { MyOrdersEmpty } from './my-orders-empty';
import { OrderItem } from '../../my-orders/order-item';
import { Spinner } from '@/shared/ui/spinner';

import { paths } from '@/shared/config/paths';

interface Props {
  className?: string;
}
export const MyOrdersBlock = ({ className }: Props) => {
  const { data: orders, isLoading } = useOrders();

  return (
    <div className={cn('bg-white p-6 w-full rounded-lg flex flex-col relative', className)}>
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
          <table className="h-full laptop:min-h-[300px] tablet:min-h-max">
            <tbody className="tablet:hidden flex flex-col gap-2 h-full overflow-y-auto">
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
