import { create } from 'zustand';

import type { IPrices } from './types';

export interface FiltersStore {
  page?: string;
  prices: IPrices;
  delivery?: boolean;
  brands: string[];
  sorting?: string;
  setPage: (page?: string) => void;
  setPrices: ({}: IPrices) => void;
  setDelivery: (value?: boolean) => void;
  setBrands: (brands: string[]) => void;
  setSorting: (sorting?: string) => void;
}

export const useFiltersStore = create<FiltersStore>()((set) => ({
  page: undefined,
  prices: {
    min: undefined,
    max: undefined,
  },
  delivery: undefined,
  brands: [],
  sorting: undefined,
  setPage: (page) =>
    set(() => ({
      page: page,
    })),
  setPrices: (prices) =>
    set(() => ({
      prices: prices,
    })),
  setBrands: (brands) =>
    set(() => ({
      brands: brands,
    })),
  setDelivery: (value) =>
    set(() => ({
      delivery: value,
    })),
  setSorting: (sorting) =>
    set(() => ({
      sorting: sorting,
    })),
}));
