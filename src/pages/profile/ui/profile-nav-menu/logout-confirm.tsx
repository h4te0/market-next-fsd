import { useLogout } from '../../api/use-logout';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutConfirm = ({ isOpen, onClose }: Props) => {
  const { logout, isPending } = useLogout(onClose);

  const onClickSignOut = () => {
    logout();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white p-10 rounded-3xl">
        <DialogTitle className="font-bold text-xl">Вы уверены, что хотите выйти?</DialogTitle>
        <Button disabled={isPending} variant="default" onClick={onClickSignOut}>
          Да, выйти
        </Button>
        <Button variant="ghost" onClick={handleClose}>
          Отмена
        </Button>
      </DialogContent>
    </Dialog>
  );
};
