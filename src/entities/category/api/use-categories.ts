import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { ICategoriesWithChildren } from '../model/categories-with-children';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get<ICategoriesWithChildren[]>('/api/categories'),
    select: ({ data }) => data,
  });
};
