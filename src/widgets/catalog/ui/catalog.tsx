'use client';

import { useState } from 'react';

import { Filters } from './filters/filters';
import { ProductsList } from './products-list';
import { ProductsPagination } from './products-pagination';

import type { IProductWithCartAndFav } from '@/entities/product';
import type { IFilterProps, IPagination } from '../model/types';
import { MobileFilters } from './filters/mobile-filters';
import { useFilters } from '../model/use-filters';

interface Props {
  productsListProps: {
    products: IProductWithCartAndFav[];
    total: number;
    catalogTitle: string;
  };
  filterProps: IFilterProps;
  paginationProps: IPagination;
}

export const Catalog = ({ filterProps, paginationProps, productsListProps }: Props) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleMobileFilters = {
    open: () => setMobileFiltersOpen(true),
    close: () => setMobileFiltersOpen(false),
    state: mobileFiltersOpen,
  };

  useFilters(paginationProps.totalPages);

  return (
    <>
      <div className="grid grid-cols-12 gap-4 laptop:flex laptop:justify-between">
        <Filters
          classname="col-span-3 tablet:hidden min-w-[250px] max-w-[300px]"
          {...filterProps}
        />
        <div className="col-span-9 tablet:col-span-12 w-full">
          <ProductsList {...productsListProps} handleMobileFilters={handleMobileFilters} />
          <ProductsPagination classname="my-4" {...paginationProps} />
        </div>
      </div>
      <MobileFilters
        isOpen={handleMobileFilters.state}
        handleClose={handleMobileFilters.close}
        filterProps={filterProps}
      />
    </>
  );
};
