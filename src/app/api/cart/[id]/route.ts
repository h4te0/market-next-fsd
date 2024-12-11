import { prisma } from '@/shared/api/prisma-client';
// import { updateCartTotalAmount } from '@/shared/helpers/update-cart-total-amount';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const data = (await req.json()) as { quantity: number };
    const cartToken = req.cookies.get('cartToken')?.value;

    if (!cartToken) {
      return NextResponse.json({ error: 'Cart token not found' }, { status: 404 });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    const updatedCartItem = await prisma.cart.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: data.quantity,
      },
    });

    return NextResponse.json(updatedCartItem);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;

    const cartToken = req.cookies.get('cartToken')?.value;

    if (!cartToken) {
      return NextResponse.json({ error: 'Cart token not found' }, { status: 404 });
    }

    const cartItem = await prisma.cart.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    const updatedCartItem = await prisma.cart.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(updatedCartItem);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 });
  }
}
