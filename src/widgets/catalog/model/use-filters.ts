import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import qs from 'qs';

import { useFiltersStore } from './filters-store';

export const useFilters = (totalPages: number) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const filters = useFiltersStore();

  useEffect(() => {
    const minPrice = Number(searchParams?.get('min')) || undefined;
    const maxPrice = Number(searchParams?.get('max')) || undefined;
    const brands = searchParams?.get('brands')?.split(',') || [];
    const delivery = Boolean(searchParams?.get('delivery'));
    const page = searchParams?.get('page') || undefined;
    const sorting = searchParams?.get('sorting') || undefined;

    filters.setPrices({ min: minPrice, max: maxPrice });
    filters.setBrands(brands);
    filters.setDelivery(delivery);
    filters.setSorting(sorting);

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
      sorting: filters.sorting,
    };
    const query = qs.stringify(filtersQuery, { arrayFormat: 'comma' });
    push(`?${query}`, { scroll: false });
  }, [filters]);
};
