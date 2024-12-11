import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteFromCart, isPending } = useMutation({
    mutationKey: ['delete from cart'],
    mutationFn: (id: number) => axios.delete(`/api/cart/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err.message);
    },
  });

  return { deleteFromCart, isPending };
};

export const useDeleteManyFromCart = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteManyFromCart, isPending } = useMutation({
    mutationKey: ['delete many from cart'],
    mutationFn: (items: number[]) => axios.delete(`/api/cart`, { data: { items } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      toast.error('Ошибка удаления из корзины');
      console.error(err.message);
    },
  });

  return { deleteManyFromCart, isPending };
};
