'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import qs from 'qs';

import { cn } from '@/shared/lib/tailwind-merge';

import { Accordion } from '@/shared/ui/accordion';

import { PriceFilter } from './price-filter';
import { BrandsFilter } from './brands-filter';
import { DeliveryFilter } from './delivery-filter';

import { useFiltersStore } from '../model/filters-store';

import type { Brand } from '@prisma/client';

interface Props {
  classname?: string;
  brands: Brand[];
  maxPrice: number;
  minPrice: number;
  totalPages: number;
}

export const Filters = (props: Props) => {
  const { classname, brands, maxPrice, minPrice, totalPages } = props;

  const searchParams = useSearchParams();
  const { push } = useRouter();

  const filters = useFiltersStore();

  useEffect(() => {
    const minPrice = Number(searchParams?.get('min')) || undefined;
    const maxPrice = Number(searchParams?.get('max')) || undefined;
    const brands = searchParams?.get('brands')?.split(',') || [];
    const delivery = Boolean(searchParams?.get('delivery'));
    const page = searchParams?.get('page') || undefined;

    filters.setPrices({ min: minPrice, max: maxPrice });
    filters.setBrands(brands);
    filters.setDelivery(delivery);

    if (totalPages < Number(page)) {
      filters.setPage(undefined);
    } else {
      filters.setPage(page);
    }
  }, [searchParams]);

  useEffect(() => {
    const filtersQuery = {
      page: filters.page,
      ...filters.prices,
      delivery: filters.delivery || undefined,
      brands: [...filters.brands],
    };
    const query = qs.stringify(filtersQuery, { arrayFormat: 'comma' });
    push(`?${query}`, { scroll: false });
  }, [filters]);

  return (
    <div className={cn('bg-white px-4 py-6 rounded-2xl h-fit', classname)}>
      <Accordion type="multiple" defaultValue={['price', 'brands']}>
        <PriceFilter
          setPrices={filters.setPrices}
          prices={filters.prices}
          maxPrice={maxPrice}
          minPrice={minPrice}
        />
        <BrandsFilter brands={brands} selected={filters.brands} setSelected={filters.setBrands} />
        <DeliveryFilter isDelivery={filters.delivery} setIsDelivery={filters.setDelivery} />
      </Accordion>
    </div>
  );
};
