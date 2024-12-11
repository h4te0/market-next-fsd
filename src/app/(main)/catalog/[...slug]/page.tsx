import { getCurrentCategories } from '@/entities/category';

import { CatalogPage } from '@/pages/catalog';

interface Props {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export const generateMetadata = async (props: Props) => {
  const slug = (await props.params).slug;

  const currentCategories = await getCurrentCategories(slug.at(-1));
  return {
    title: currentCategories?.at(-1)?.title,
  };
};

const Catalog = async (props: Props) => {
  return <CatalogPage {...props} />;
};

export default Catalog;
