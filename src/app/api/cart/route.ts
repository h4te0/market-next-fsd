import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

import { prisma } from '@/shared/api/prisma-client';
import { getCurrentUser } from '@/entities/user';
import { Cart } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const cartToken = req.cookies.get('cartToken')?.value;

    if (!cartToken) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const currentUser = await getCurrentUser();

    const cart = await prisma.cart.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        OR: [
          {
            userId: currentUser?.id,
          },
          {
            token: cartToken,
          },
        ],
      },
      include: {
        product: {
          include: {
            favorites: true,
          },
        },
      },
    });

    const {
      _sum: { quantity: totalCount },
    } = await prisma.cart.aggregate({
      where: {
        token: cartToken,
      },
      _sum: {
        quantity: true,
      },
    });

    const totalSum =
      cart.length &&
      cart.map((item) => item.product.price * item.quantity).reduce((acc, price) => acc + price);

    return NextResponse.json({ cart, totalCount, totalSum });
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let cartToken = req.cookies.get('cartToken')?.value;

    const currentUser = await getCurrentUser();

    if (currentUser?.cartToken) {
      cartToken = currentUser?.cartToken;
      req.cookies.set('cartToken', currentUser?.cartToken);
    }

    if (!cartToken) {
      cartToken = crypto.randomUUID();
    }

    const data = (await req.json()) as Cart;

    const findCartItem = await prisma.cart.findFirst({
      where: {
        token: cartToken,
        productId: data.productId,
      },
    });

    if (findCartItem) {
      await prisma.cart.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
          userId: currentUser?.id || null,
        },
      });
    } else {
      await prisma.cart.create({
        data: {
          token: cartToken,
          productId: data.productId,
          quantity: 1,
          userId: currentUser?.id || null,
        },
      });
    }

    const res = NextResponse.json(findCartItem);
    res.cookies.set('cartToken', cartToken, { maxAge: 60 * 60 * 24 * 30 });

    return res;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const cartToken = req.cookies.get('cartToken')?.value;

    if (!cartToken) {
      return NextResponse.json({ error: 'Токен не найден' });
    }

    const data = (await req.json()) as { items: number[] };

    const cartItems = await prisma.cart.findMany({
      where: {
        id: {
          in: data.items,
        },
      },
    });

    if (!cartItems.length) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    await prisma.cart.deleteMany({
      where: {
        id: {
          in: data.items,
        },
      },
    });

    return NextResponse.json({ message: 'deleted' }, { status: 200 });
  } catch (error) {
    console.log('[DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить товар' }, { status: 500 });
  }
}
