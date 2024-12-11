import { cookies } from 'next/headers';

import { prisma } from '@/shared/api';
import { getCurrentUser } from '@/entities/user';

import { ProductsBlock } from '@/widgets/products-block';
import { MainSlider } from './main-slider';
import { Stories } from './stories';
import { Container } from '@/shared/ui/container';

export const HomePage = async () => {
  const cookieStore = await cookies();

  const cartToken = cookieStore.get('cartToken')?.value;
  const currentUser = await getCurrentUser();

  const popularPhones = await prisma.product.findMany({
    take: 6,
    orderBy: {
      favorites: {
        _count: 'desc',
      },
    },
    include: {
      cart: {
        where: {
          OR: [
            { userId: currentUser?.id || null, token: cartToken || '' },
            { token: cartToken || '' },
          ],
        },
      },

      favorites: currentUser
        ? {
            where: { userId: currentUser?.id || null },
            include: {
              product: true,
            },
          }
        : false,
    },
  });

  return (
    <Container>
      <MainSlider />
      <Stories />
      <ProductsBlock title="Популярные смартфоны" products={popularPhones} />
    </Container>
  );
};
