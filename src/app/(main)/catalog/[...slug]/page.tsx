import { getCurrentCategories } from '@/entities/category';

import { CatalogPage } from '@/pages/catalog';

interface Props {
  params: { slug: string[] };
  searchParams: { [key: string]: string | undefined };
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;

  const currentCategories = await getCurrentCategories(slug.at(-1));
  return {
    title: currentCategories?.at(-1)?.title,
  };
};

const Catalog = async (props: Props) => {
  return <CatalogPage {...props} />;
};

export default Catalog;
