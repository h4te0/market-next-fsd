import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateItemCount = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCount, isPending } = useMutation({
    mutationKey: ['update item count'],
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      axios.patch(`/api/cart/${id}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      toast.error('Ошибка обновления количества');
      console.error(err.message);
    },
  });

  return { updateCount, isPending };
};
