import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/shared/api/prisma-client';
import { getCurrentUser } from '@/entities/user';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json([]);
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: currentUser?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        product: {
          include: {
            favorites: true,
          },
        },
      },
    });
    return NextResponse.json(favorites);
  } catch (error) {
    console.log('[FAVORITES_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить избранные' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ status: 401 });
    }

    const { id } = (await req.json()) as { id: number };

    const findFavoriteItem = await prisma.favorite.findFirst({
      where: {
        productId: id,
        userId: currentUser.id,
      },
    });

    if (findFavoriteItem) {
      const deletedFavoriteItem = await prisma.favorite.delete({
        where: {
          id: findFavoriteItem.id,
        },
      });

      return NextResponse.json(deletedFavoriteItem);
    }

    if (!findFavoriteItem) {
      const createdFavoriteItem = await prisma.favorite.create({
        data: {
          productId: id,
          userId: currentUser.id,
        },
      });

      return NextResponse.json(createdFavoriteItem);
    }
  } catch (error) {
    console.log('[FAVORITES_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать избранное' }, { status: 500 });
  }
}
