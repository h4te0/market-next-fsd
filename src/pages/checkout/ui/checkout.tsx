'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next-nprogress-bar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCart } from '@/entities/cart';

import { CheckoutAddressForm } from './forms/checkout-address-form';
import { CheckoutPersonalForm } from './forms/checkout-personal-form';
import { CheckoutCartItems } from './checkout-cart-items';
import { CheckoutSidebar } from './checkout-sidebar';

import { Container } from '@/shared/ui/container';
import { Form } from '@/shared/ui/form';
import { Title } from '@/shared/ui/title';

import { paths } from '@/shared/config/paths';
import { formCheckoutSchema, TFormCheckoutValues } from '../model/checkout-form-schema';

import type { User } from '@prisma/client';
import { useCreateOrder } from '@/features/create-order';
import { useEffect } from 'react';

interface Props {
  user: User | null;
}

export const Checkout = ({ user }: Props) => {
  const { data, isLoading } = useCart();
  const { createOrder, isPending } = useCreateOrder();

  const router = useRouter();

  const form = useForm<TFormCheckoutValues>({
    resolver: zodResolver(formCheckoutSchema),
    defaultValues: {
      email: user?.email || '',
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      address: user?.address || '',
      comment: '',
    },
  });

  const onSubmit = async (data: TFormCheckoutValues) => {
    createOrder(data);
  };

  useEffect(() => {
    if (data?.cart.length == 0) {
      router.push(paths.cart);
      toast.error('У вас нет товаров в корзине');
    }
  }, [data]);

  return (
    <Container classname="pt-3">
      <Title size="lg" className="mb-6">
        Оформление заказа
      </Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10 laptop:flex-col tablet:gap-4">
            <div className="flex flex-col gap-10 flex-1 mb-10 laptop:mb-0 tablet:gap-4">
              <CheckoutCartItems cart={data?.cart} isLoading={isLoading} />
              <CheckoutPersonalForm
                classname={isLoading ? 'opacity-40 pointer-events-none' : ''}
                control={form.control}
                register={form.register}
              />
              <CheckoutAddressForm
                classname={isLoading ? 'opacity-40 pointer-events-none' : ''}
                control={form.control}
              />
            </div>
            <div className="w-[450px] laptop:w-auto laptop:mb-10 tablet:mb-4">
              <CheckoutSidebar
                totalAmount={data?.totalSum}
                quantity={data?.totalCount}
                isLoading={isLoading}
                isPending={isPending}
              />
            </div>
          </div>
        </form>
      </Form>
    </Container>
  );
};
