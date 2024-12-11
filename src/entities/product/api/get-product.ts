import { cookies } from 'next/headers';

import { prisma } from '@/shared/api';
import { getCurrentUser } from '@/entities/user';

export const getProduct = async (slug: string | undefined) => {
  const cookieStore = await cookies();

  const cartToken = cookieStore.get('cartToken')?.value;
  const currentUser = await getCurrentUser();

  return prisma.product.findFirst({
    where: {
      slug,
    },
    include: {
      categories: true,
      cart: {
        where: {
          OR: [
            { userId: currentUser?.id || null, token: cartToken || '' },
            { token: cartToken || '' },
          ],
        },
        include: {
          product: true,
        },
      },
      favorites: currentUser
        ? {
            where: {
              userId: currentUser?.id || null,
            },
            include: {
              product: true,
            },
          }
        : false,
    },
  });
};
