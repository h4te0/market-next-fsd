'use client';

import { useState } from 'react';

import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
import { AuthVariants } from './auth-variants';
import { AuthSwitch } from './auth-switch';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: Props) => {
  const [type, setType] = useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10 rounded-3xl">
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <AuthVariants />
        <AuthSwitch type={type} onSwitchType={onSwitchType} />
      </DialogContent>
    </Dialog>
  );
};
