import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';

import { paths } from '@/shared/config/paths';

export const CartEmpty = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-white rounded-lg p-4">
      <Image
        src="/empty-cart.png"
        alt="Cart empty"
        width={300}
        height={300}
        className="pointer-events-none"
      />
      <div className="w-fit flex flex-col justify-center items-center my-6">
        <Title size="lg">Корзина пуста</Title>
        <p className="my-4">Посмотрите предложения на главной странице.</p>
        <Link href={paths.home} className="w-full">
          <Button className="w-full">Главная</Button>
        </Link>
      </div>
    </div>
  );
};
