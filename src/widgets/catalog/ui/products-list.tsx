import { useSearchParams } from 'next/navigation';
import { ArrowDownUp, Settings2 } from 'lucide-react';
import qs from 'qs';

import { cn } from '@/shared/lib/tailwind-merge';
import { getNounByCount } from '@/shared/lib/get-noun-by-numb';
import { useFiltersStore } from '../model/filters-store';

import { CatalogEmpty } from './catalog-empty';
import { ProductItem } from '@/entities/product/ui/product-item';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

import type { IProductWithCartAndFav } from '@/entities/product';

interface Props {
  classname?: string;
  catalogTitle?: string;
  total: number;
  products: IProductWithCartAndFav[];
  handleMobileFilters: {
    open: () => void;
    close: () => void;
    state: boolean;
  };
}

const sorting = [
  {
    title: 'По алфавиту',
    value: { title: 'asc' },
  },
  {
    title: 'По возрастанию цены',
    value: { price: 'asc' },
  },
  {
    title: 'По убыванию цены',
    value: { price: 'desc' },
  },
];

export const ProductsList = ({
  classname,
  products,
  catalogTitle,
  total,
  handleMobileFilters,
}: Props) => {
  const searchParams = useSearchParams();

  const filters = useFiltersStore();

  return (
    <>
      <div className={cn(classname)}>
        <div className="mb-4 flex justify-between tablet:flex-col gap-2">
          <div>
            <Title size="md" className="tablet:text-xl">
              {catalogTitle}
            </Title>
            <p className="text-sm tablet:text-xs">
              {getNounByCount(
                total,
                `Найден ${total} товар`,
                `Найдено ${total} товара`,
                `Найдено ${total} товаров`,
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 tablet:justify-between tablet:mt-4">
            <Select onValueChange={(sort) => filters.setSorting(sort)}>
              <SelectTrigger className="border bg-white p-2 gap-2 phone:text-xs">
                <ArrowDownUp strokeWidth={1} />
                <SelectValue placeholder={searchParams?.get('sorting') || 'По алфавиту'} />
              </SelectTrigger>
              <SelectContent>
                {sorting.map((item, i) => (
                  <SelectItem key={i} className="phone:text-xs" value={qs.stringify(item.value)}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              className="hidden tablet:flex font-bold border bg-white p-2 gap-2 phone:text-xs"
              onClick={handleMobileFilters.open}>
              <Settings2 strokeWidth={1} />
              Фильтры
            </Button>
          </div>
        </div>
        {!products.length ? (
          <CatalogEmpty />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))] gap-4">
            {products.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
