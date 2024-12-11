import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrderAction } from '@/app/actions';

import { TFormCheckoutValues } from '@/pages/checkout';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: createOrder, isPending } = useMutation({
    mutationKey: ['create order'],
    mutationFn: (data: TFormCheckoutValues) => createOrderAction(data),
    onSuccess: (url) => {
      toast.success('Заказ создан! Переход на оплату...');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      location.href = url;
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  return { createOrder, isPending };
};
