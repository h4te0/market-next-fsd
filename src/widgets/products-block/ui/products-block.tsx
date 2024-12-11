import { Title } from '@/shared/ui/title';

import { ProductItem, type IProductWithCartAndFav } from '@/entities/product';

interface Props {
  title?: string;
  products: IProductWithCartAndFav[];
}

export const ProductsBlock = ({ title, products }: Props) => {
  return (
    <div className="mt-4">
      <Title size="md" className="mb-4">
        {title}
      </Title>
      <div className="flex gap-2">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
