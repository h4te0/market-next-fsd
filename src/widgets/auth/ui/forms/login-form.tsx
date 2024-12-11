'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLogin } from '../../api/use-login';

import { Form, FormInput } from '@/shared/ui/form';
import { DialogTitle } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';

import { formLoginSchema, TFormLoginValues } from '../../model/auth-form-schema';

interface Props {
  onClose?: () => void;
}

export const LoginForm = ({ onClose }: Props) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { login, isPending } = useLogin(onClose);

  const onSubmit = (data: TFormLoginValues) => {
    login(data);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <DialogTitle>Добро пожаловать!</DialogTitle>
          </div>
        </div>
        <FormInput
          control={form.control}
          name="email"
          label="Ваша электронная почта"
          placeholder="Email"
        />
        <FormInput
          control={form.control}
          name="password"
          label="Ваш пароль"
          placeholder="Пароль"
          type="password"
        />
        <Button disabled={isPending} type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
};
