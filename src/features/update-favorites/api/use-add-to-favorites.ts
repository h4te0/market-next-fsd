import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next-nprogress-bar';

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    mutate: addToFavorites,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['add to favorites'],
    mutationFn: (id: number) => axios.post('/api/favorites', { id }),
    onSuccess: (res) => {
      if (res.data.status == 401) {
        toast.error('Вы не авторизированы. Пожалуйста авторизуйтесь');
        throw new Error('Вы не авторизированы. Пожалуйста авторизуйтесь');
      }

      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.every((key) => ['favorites', 'cart'].includes(String(key))),
      });
      router.refresh();
    },
  });

  return { addToFavorites, isPending, isSuccess };
};
