'use client';

import { CircleUserRound, Edit } from 'lucide-react';

import { cn } from '@/shared/lib/tailwind-merge';
import { formatUserRole } from '@/shared/lib/formatters/format-user-role';

import type { User } from '@prisma/client';

interface Props {
  user: User | null;
  onEditOpen: () => void;
  className?: string;
}

export const UserInfoBlock = ({ user, onEditOpen, className }: Props) => {
  const userDetails = [
    {
      title: 'Email',
      value: user?.email,
    },
    {
      title: 'Телефон',
      value: user?.phone,
    },
    {
      title: 'Адрес',
      value: user?.address,
    },
  ];

  return (
    <div className={cn('bg-white p-6 w-full rounded-lg max-h-[272px]', className)}>
      <div className="tablet:hidden">
        <div className="flex justify-between">
          <div className="flex">
            <CircleUserRound color="#f97316" width={50} height={50} strokeWidth={1} />
            <div className="flex flex-col justify-between ml-4">
              <p className="font-bold text-lg">{user?.fullName}</p>
              <p className="font-light text-sm">{formatUserRole(user?.role)}</p>
            </div>
          </div>
          <div className="cursor-pointer" onClick={onEditOpen}>
            <Edit color="#2094f3" />
          </div>
        </div>
        <hr className="my-4" />
        <div className="">
          <ul className="flex flex-col gap-2">
            {userDetails.map((obj, i) => (
              <li className="flex gap-4" key={i}>
                <p className="text-gray-400 text-sm">{obj.title}</p>
                <p className="text-sm font-medium">{obj.value || 'Не указано'}</p>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <p className="text-xs text-gray-400">
            Если вы зарегистрированы через сторонний сервис, вы можете поменять пароль в
            редактировании персональных данных.
          </p>
        </div>
      </div>
      <div className="hidden tablet:block">
        <div className="flex">
          <CircleUserRound color="#f97316" width={70} height={70} strokeWidth={1} />
          <div className="flex flex-col justify-between ml-4">
            <p className="font-bold text-lg">{user?.fullName}</p>
            <p className="font-light text-sm">{user?.email}</p>
            <p className="font-light text-sm text-secondary cursor-pointer" onClick={onEditOpen}>
              Редактировать
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
