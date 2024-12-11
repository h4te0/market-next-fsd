'use server';

import { compare, hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

import { prisma } from '@/shared/api/prisma-client';
import { sendEmail } from '@/shared/lib/send-email';
import { getCurrentUser } from '@/entities/user';
import { createPayment } from '@/shared/lib/create-payment';

import { UserVerificationTemplate } from '@/shared/ui/email-templates/user-verification';
import { PayOrderTemplate } from '@/shared/ui/email-templates/pay-order';

import type { Prisma } from '@prisma/client';
import type { TFormCheckoutValues } from '@/pages/checkout';
import type { TFormPasswordChangeValues } from '@/features/update-user';

export const createOrderAction = async (body: TFormCheckoutValues) => {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    const userCart = await prisma.cart.findMany({
      where: { token: cartToken },
      include: {
        user: true,
        product: {
          include: {
            favorites: true,
          },
        },
      },
    });

    const totalSum =
      userCart.length &&
      userCart
        .map((item) => item.product.price * item.quantity)
        .reduce((acc, price) => acc + price);

    if (!cartToken || !userCart) throw Error('Корзина не найдена');
    if (totalSum === 0) throw Error('Корзина пустая');

    if (userCart[0].userId) {
      await prisma.user.update({
        where: {
          id: userCart[0].userId,
        },
        data: {
          phone: body.phone,
          address: body.address,
        },
      });
    }

    const hasDelivery = totalSum < 10000;

    const totalAmountWithDelivery = hasDelivery ? totalSum + 1000 : totalSum;

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        comment: body.comment,
        totalAmount: totalAmountWithDelivery,
        items: JSON.stringify(userCart),
      },
    });

    await prisma.cart.deleteMany({
      where: {
        token: cartToken,
      },
    });

    const paymentData = await createPayment({
      email: body.email,
      checkoutItems: userCart,
      orderId: order.id,
      hasDelivery,
    });

    if (!paymentData.url) throw Error('Ошибка создания заказа');

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        userId: userCart[0].userId,
        paymentId: paymentData.id,
      },
    });

    await sendEmail(
      body.email,
      `Оплата заказаа #${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: totalAmountWithDelivery,
        paymentUrl: paymentData.url,
      }),
    );
    return paymentData.url;
  } catch (error) {
    console.error('Error [CREATE_ORDER]', error);
    throw error;
  }
};

export const registerUserAction = async (body: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) throw new Error('Пользователь уже существует');

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await sendEmail(
      body.email,
      'Подтверждение регистрации',
      UserVerificationTemplate({
        code,
      }),
    );

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password, 10) : null,
      },
    });

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });
  } catch (error) {
    console.error('Error [CREATE_USER]', error);
    throw error;
  }
};

export const updateUserDetailsAction = async (body: Prisma.UserUpdateInput) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        updatedAt: new Date(),
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
};

export const updateUserPasswordAction = async (body: TFormPasswordChangeValues) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    if (body.oldPassword) {
      const isPasswordValid = await compare(String(body.oldPassword), findUser?.password || '');
      if (isPasswordValid) {
        await prisma.user.update({
          where: {
            id: Number(currentUser.id),
          },
          data: {
            password: hashSync(body.newPassword as string, 10),
          },
        });
      } else {
        throw new Error('Неверный текущий пароль');
      }
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        password: hashSync(body.newPassword as string, 10),
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER_PASSWORD]', err);
    throw err;
  }
};
