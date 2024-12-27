'use client';

import { useState } from 'react';

import { useLogout } from '../api/use-logout';

import { cn } from '@/shared/lib/tailwind-merge';

import { AuthModal } from '@/widgets/auth';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';

import type { User } from '@prisma/client';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutButton = ({ user, className }: { user: User | null; className?: string }) => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  if (!user)
    return (
      <>
        <button
          onClick={() => setAuthOpen(true)}
          className={cn(
            'flex items-center text-sm leading-5 py-4 w-full text-secondary',
            className,
          )}>
          Авторизоваться
        </button>
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  return (
    <>
      <button
        onClick={() => setLogoutOpen(true)}
        className={cn(
          'flex items-center text-sm leading-5 py-4 w-full text-destructive',
          className,
        )}>
        Выйти
      </button>
      <LogoutConfirm isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  );
};

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
      <DialogContent className="bg-white p-10 rounded-3xl tablet:max-w-full tablet:bottom-0 tablet:top-auto tablet:translate-y-0">
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
