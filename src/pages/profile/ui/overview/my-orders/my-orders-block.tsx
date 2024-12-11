import Link from 'next/link';
import Image from 'next/image';
import { Package } from 'lucide-react';

import { useOrders } from '@/entities/order';
import { formatDate } from '@/shared/lib/formatters/format-date';

import { MyOrdersEmpty } from './my-orders-empty';
import { OrderStatus } from '../../my-orders/order-status';
import { Spinner } from '@/shared/ui/spinner';

import { paths } from '@/shared/config/paths';

import type { ICartItemWithProduct } from '@/entities/cart';

interface Props {}

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const MyOrdersBlock = ({}: Props) => {
  const { data: orders, isLoading } = useOrders();

  return (
    <div className="bg-white p-6 w-full rounded-lg max-h-[272px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Package color="#f97316" />
          Мои заказы
        </h2>
        <Link href={paths.profile.orders} className="text-secondary">
          Перейти в мои заказы
        </Link>
      </div>
      {isLoading ? (
        <Spinner containerClassName="h-4/5" />
      ) : orders?.length ? (
        <div className="flex flex-col gap-2 h-4/5 overflow-y-auto">
          {orders?.map((order) => (
            <div className="border rounded p-2" key={order.id}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-bold text-sm">Заказ №{order.id}</p>
                  <p className="text-xs text-gray-400">
                    {formatDate(order.createdAt, dateOptions)}
                  </p>
                </div>
                <p className="font-bold text-sm">{order.totalAmount.toLocaleString('ru')} ₸</p>
              </div>
              <div className="flex justify-between items-center">
                <OrderStatus status={order.status} classname="text-xs w-fit h-fit" />
                <div className="flex gap-2 max-w-[240px] overflow-x-auto">
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MyOrdersEmpty />
      )}
    </div>
  );
};
