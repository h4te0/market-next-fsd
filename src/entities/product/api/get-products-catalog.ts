import { cookies } from 'next/headers';
import qs from 'qs';

import { prisma } from '@/shared/api';
import { getCurrentUser } from '@/entities/user';

interface Props {
  slug: string | undefined;
  take: number;
  skip: number;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export const getProductsCatalog = async ({ slug, take = 8, skip = 0, searchParams }: Props) => {
  const cookieStore = await cookies();
  const { min, max, brands, delivery, sorting } = await searchParams;

  const {
    _min: { price: minPrice },
    _max: { price: maxPrice },
  } = await prisma.product.aggregate({
    where: {
      categories: {
        some: { slug: slug },
      },
    },
    _min: {
      price: true,
    },
    _max: {
      price: true,
    },
  });

  const filters = {
    minPrice: Number(min) || minPrice || 0,
    maxPrice: Number(max) || maxPrice || 1000000,
    brands: brands?.split(','),
    isDelivery: Boolean(delivery) || undefined,
    sorting: qs.parse(sorting || 'title=asc'),
  };

  const totalCount = await prisma.product.count({
    where: {
      categories: {
        some: { slug: slug },
      },
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      brand: {
        slug: filters.brands && {
          in: filters.brands,
        },
      },
      isDelivery: filters.isDelivery,
    },
  });

  const currentUser = await getCurrentUser();
  const cartToken = cookieStore.get('cartToken')?.value;

  const res = await prisma.product.findMany({
    take,
    skip,
    orderBy: filters.sorting,

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
    where: {
      categories: {
        some: { slug: slug },
      },
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      brand: {
        slug: filters.brands && {
          in: filters.brands,
        },
      },
      isDelivery: filters.isDelivery,
    },
  });

  return {
    products: res,
    total: totalCount,
    filters: {
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 1000000,
    },
    pagination: {
      hasNextPage: skip + take < totalCount,
      hasPrevPage: skip > 0,
      totalPages: Math.ceil(totalCount / take),
    },
  };
};
