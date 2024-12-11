import { getProduct } from '@/entities/product';

import { ProductPage } from '@/pages/product';

interface Props {
  params: { slug: string };
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;

  const product = await getProduct(slug);
  return {
    title: product?.title,
  };
};

const Product = async ({ params }: Props) => {
  const { slug } = await params;
  console.log(slug);
  const product = await getProduct(slug);

  return <ProductPage product={product} />;
};

export default Product;
