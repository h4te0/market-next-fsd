import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { prisma } from '@/shared/api';
import { AddToCartButton } from '@/features/update-cart';
import { AddToFavoritesButton } from '@/features/update-favorites';
import { getCurrentUser } from '@/entities/user';

import { ProductDescription } from './product-description';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { ProductImageGallery } from './product-image-gallery';
import { ProductsBlock } from '@/widgets/products-block';
import { Container } from '@/shared/ui/container';
import { Title } from '@/shared/ui/title';

import type { IProductWithCartAndFav } from '@/entities/product';

interface Props {
  product?:
    | (IProductWithCartAndFav & {
        categories: {
          id: number;
          title: string;
          slug: string;
        }[];
      })
    | null;
}

export const ProductPage = async ({ product }: Props) => {
  if (!product) return notFound();

  const cookieStore = await cookies();

  const cartToken = cookieStore.get('cartToken')?.value;
  const currentUser = await getCurrentUser();
  const categorySlug = product.categories.at(-1)?.slug;

  const sameCategoryProducts = await prisma.product.findMany({
    take: 6,
    orderBy: {
      favorites: {
        _count: 'desc',
      },
    },
    where: {
      categories: { some: { slug: categorySlug } },
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
      <Breadcrumbs slug={product.categories.at(-1)?.slug} lastTitle={product.title} />
      <div className="flex gap-4 laptop:flex-col">
        <div className="bg-white p-6 rounded-lg ">
          <Title>{product?.title}</Title>
          <div className="mt-6 grid grid-cols-2 gap-12 tablet:grid-cols-1">
            <ProductImageGallery product={product} />
            <ProductDescription description={product?.description} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg min-w-[360px] h-fit phone:min-w-full">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Артикул: {product?.article}</p>
            <AddToFavoritesButton id={product.id} isInFavorites={!!product?.favorites?.length} />
          </div>
          <hr className="my-4 " />
          <p className="text-3xl text-primary font-bold">{product?.price.toLocaleString('ru')} ₸</p>
          <div className="flex my-4">
            <p className="text-gray-500 font-bold">Доставка</p>
            <div className="border-b-2 border-dotted w-full border-gray-300 mx-2"></div>
            <p className="text-secondary font-bold">{product.isDelivery ? 'Есть' : 'Нет'}</p>
          </div>
          <AddToCartButton
            className="h-12 text-md"
            id={product.id}
            isInCart={!!product?.cart?.length}
          />
        </div>
      </div>
      <ProductsBlock products={sameCategoryProducts} title="Популярные товары той же категории" />
    </Container>
  );
};
