import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { Story, StoryItem } from '@prisma/client';

export interface IStoryWithItems extends Story {
  items: StoryItem[];
}

export const useStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: () => axios.get<IStoryWithItems[]>('/api/stories'),
    select: ({ data }) => data,
  });
};
