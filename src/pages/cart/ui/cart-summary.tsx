import Link from 'next/link';

import { getNounByCount } from '@/shared/lib/get-noun-by-numb';

import { Button } from '@/shared/ui/button';

import { paths } from '@/shared/config/paths';

interface Props {
  totalAmount: number;
  quantity: number;
  isDisabled: boolean;
}

export const CartSummary = ({ totalAmount, quantity, isDisabled }: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-8 max-w-[402px] laptop:max-w-full h-fit tablet:fixed tablet:bottom-16 tablet:left-0 tablet:w-full tablet:flex tablet:justify-between tablet:items-center tablet:border-t tablet:py-4">
      <div className="flex justify-between pb-2 border-b tablet:border-none">
        <p className="font-bold tablet:hidden">Сумма к оплате: </p>
        <p className="font-bold">{totalAmount.toLocaleString('ru')} ₸</p>
      </div>
      <div className="flex justify-between mt-2 mb-8 text-[12px] tablet:hidden">
        <p>
          {getNounByCount(
            quantity,
            `${quantity} товар`,
            `${quantity} товара`,
            `${quantity} товаров`,
          )}{' '}
          на сумму
        </p>
        <p>{totalAmount.toLocaleString('ru')} ₸</p>
      </div>
      <Link href={paths.checkout}>
        <Button className="w-full text-lg" disabled={isDisabled}>
          Оформить заказ
        </Button>
      </Link>
      <p className="text-[12px] mt-2 leading-4 tablet:hidden">
        Оформляя заказ, вы подтверждаете свое согласие с нашими условиями покупки в
        интернет-магазине
      </p>
    </div>
  );
};
