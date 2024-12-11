import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { ICartWithItems } from '../types';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => axios.get<ICartWithItems>('/api/cart'),
    select: ({ data }: { data: ICartWithItems }) => data,
  });
};
