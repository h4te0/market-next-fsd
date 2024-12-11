import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { IFavoriteWithProduct } from '../model/favorite-with-product';

export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => axios.get<IFavoriteWithProduct[]>('/api/favorites'),
    select: ({ data }) => data,
  });
};
