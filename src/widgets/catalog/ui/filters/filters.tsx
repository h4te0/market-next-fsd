'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import qs from 'qs';

import { cn } from '@/shared/lib/tailwind-merge';
import { useFiltersStore } from '../../model/filters-store';

import { Accordion } from '@/shared/ui/accordion';

import { PriceFilter } from './price-filter';
import { BrandsFilter } from './brands-filter';
import { DeliveryFilter } from './delivery-filter';

import type { IFilterProps } from '../../model/types';

interface Props extends IFilterProps {
  classname?: string;
}

export const Filters = (props: Props) => {
  const { classname, brands, maxPrice, minPrice } = props;

  const filters = useFiltersStore();

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
