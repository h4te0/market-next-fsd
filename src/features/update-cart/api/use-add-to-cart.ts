import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next-nprogress-bar';

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    mutate: addToCart,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['add to cart'],
    mutationFn: (id: number) => axios.post('/api/cart', { productId: id }),
    onSuccess: () => {
      toast.success('Товар добавлен в корзину!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      router.refresh();
    },
    onError: (err) => {
      toast.error('Ошибка добавления в корзину');
      console.error(err.message);
    },
  });

  return { addToCart, isPending, isSuccess };
};
