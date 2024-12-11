import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { OrderStatus } from '@prisma/client';
import { prisma } from '@/shared/api/prisma-client';
import { sendEmail } from '@/shared/lib/send-email';

import { OrderSuccessTemplate } from '@/shared/ui/email-templates/order-success';

import type { ICartItemWithProduct } from '@/entities/cart';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()).data.object as Stripe.Response<Stripe.Checkout.Session>;

    if (!body.metadata) return NextResponse.json({ error: 'Ошибка обновления статуса заказа' });

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.metadata.order_id),
      },
    });

    if (!order) return NextResponse.json({ error: 'Ошибка обновления статуса заказа' });

    const isSucceeded = body.status === 'complete';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED,
      },
    });

    const items = JSON.parse(order.items as string) as ICartItemWithProduct[];

    isSucceeded &&
      sendEmail(
        order.email,
        'Ваш заказ успешно оформлен!',
        OrderSuccessTemplate({ orderId: order.id, items }),
      );

    return NextResponse.json({ message: 'Заказ оформлен!' });
  } catch (error) {
    console.error('[CHECKOUT_CALLBACK] Error: ', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
