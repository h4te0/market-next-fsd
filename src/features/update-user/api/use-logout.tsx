import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import { signOut } from 'next-auth/react';
import { deleteCookie } from 'cookies-next';
import { LogOut } from 'lucide-react';

export const useLogout = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: logout, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () =>
      signOut({
        redirect: false,
      }),

    onSuccess: () => {
      router.push('/');
      onClose?.();
      deleteCookie('cartToken');
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.every((key) => ['cart', 'favorites'].includes(String(key))),
      });
      router.refresh();
      toast.success('Вы вышли', { icon: <LogOut color="#EF4444" /> });
    },
    onError: (error) => {
      console.error('Error [LOGOUT]', error);
      toast.error('Неудалось выйти из системы');
    },
  });

  return { logout, isPending };
};
