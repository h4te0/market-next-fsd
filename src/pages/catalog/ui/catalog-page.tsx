import { getBrandsByCategory, getCurrentCategories } from '@/entities/category';
import { getProductsCatalog } from '@/entities/product';

import { Container } from '@/shared/ui/container';
import { Filters } from '@/widgets/filters';
import { ProductsList, ProductsPagination } from '@/widgets/catalog';

import { formatBrandTitles, formatCatalogTitle } from '@/shared/lib/formatters';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { notFound } from 'next/navigation';

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
  console.log(currentCategories);
  if (!currentCategories) return notFound();

  return (
    <Container>
      <Breadcrumbs slug={currentCategorySlug} />
      <div className="grid grid-cols-12 gap-4">
        <Filters
          classname="col-span-3"
          {...{ ...filters, brands: currentBrandsInCategory, totalPages: pagination.totalPages }}
        />
        <div className="col-span-9">
          <ProductsList
            {...{
              products,
              total,
              catalogTitle: formatCatalogTitle(currentCategories, selectedBrandsTitles),
            }}
          />
          <ProductsPagination classname="my-4" {...pagination} />
        </div>
      </div>
    </Container>
  );
};
