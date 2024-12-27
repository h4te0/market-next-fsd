import { Brand } from '@prisma/client';

export interface IFilterProps {
  brands: Brand[];
  maxPrice: number;
  minPrice: number;
}

export interface IPrices {
  min?: number;
  max?: number;
}

export interface IPagination {
  page?: string | null;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  classname?: string;
}
