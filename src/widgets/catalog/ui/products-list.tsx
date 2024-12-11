import { cn } from '@/shared/lib/tailwind-merge';

import { Title } from '@/shared/ui/title';
import { IProductWithCartAndFav, ProductItem } from '@/entities/product';

import { getNounByCount } from '@/shared/lib/get-noun-by-numb';

import { CatalogEmpty } from './catalog-empty';

interface Props {
  classname?: string;
  catalogTitle?: string;
  total: number;
  products: IProductWithCartAndFav[];
}

export const ProductsList = ({ classname, products, catalogTitle, total }: Props) => {
  if (!products.length) {
    return <CatalogEmpty catalogTitle={catalogTitle} total={total} />;
  }

  return (
    <div className={cn(classname)}>
      <div className="mb-4">
        <Title size="md">{catalogTitle}</Title>
        <p className="text-sm">
          {getNounByCount(
            total,
            `Найден ${total} товар`,
            `Найдено ${total} товара`,
            `Найдено ${total} товаров`,
          )}
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(208px,1fr))] gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
