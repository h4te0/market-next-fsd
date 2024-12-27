import { prisma } from '@/shared/api';

import { CategoryPage } from '@/pages/menu';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '',
};

interface Props {
  params: Promise<{ slug: string }>;
}

const Category = async ({ params }: Props) => {
  const { slug } = await params;

  const category = await prisma.category.findFirst({
    where: {
      slug,
    },
    include: {
      brand: true,
      children: {
        include: {
          brand: true,
          children: {
            include: {
              children: true,
              brand: true,
            },
          },
        },
      },
    },
  });

  return <CategoryPage categories={category?.children} parentSlug={slug} />;
};

export default Category;
