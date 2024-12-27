import { notFound } from 'next/navigation';

import { getBrandsByCategory, getCurrentCategories } from '@/entities/category';
import { getProductsCatalog } from '@/entities/product';

import { formatBrandTitles, formatCatalogTitle } from '@/shared/lib/formatters';

import { Container } from '@/shared/ui/container';
import { Catalog } from '@/widgets/catalog';
import { Breadcrumbs } from '@/widgets/breadcrumbs';

interface Props {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export const CatalogPage = async ({ params, searchParams }: Props) => {
  const { brands, page } = await searchParams;
  const { slug } = await params;

  const currentCategorySlug = slug.at(-1);
  const currentBrandsInCategory = await getBrandsByCategory(currentCategorySlug);
  const currentCategories = await getCurrentCategories(currentCategorySlug);

  const pageNumber = Number(page) || 1;

  const { products, total, pagination, filters } = await getProductsCatalog({
    slug: currentCategorySlug,
    take: 8,
    skip: (pageNumber - 1) * 8,
    searchParams,
  });

  const selectedBrandsTitles = formatBrandTitles(brands);

  if (!currentCategories) return notFound();

  return (
    <Container>
      <Breadcrumbs slug={currentCategorySlug} />
      <Catalog
        productsListProps={{
          products,
          total,
          catalogTitle: formatCatalogTitle(currentCategories, selectedBrandsTitles),
        }}
        filterProps={{
          ...filters,
          brands: currentBrandsInCategory,
        }}
        paginationProps={pagination}
      />
    </Container>
  );
};
