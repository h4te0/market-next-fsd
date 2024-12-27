'use client';

import { useState } from 'react';

import { MyOrdersBlock } from './my-orders/my-orders-block';
import { LogoutButton, UserEditForm } from '@/features/update-user';
import { UserInfoBlock } from './user-info/user-info-block';
import { Favorites } from '../favorites/favorites';

import type { User } from '@prisma/client';

interface Props {
  user: User | null;
}

export const Overview = ({ user }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  if (isEdit) return <UserEditForm data={user} onEditClose={() => setIsEdit(false)} />;

  return (
    <div className="grid grid-cols-2 gap-4 laptop:grid-cols-1 tablet:grid-cols-2">
      <UserInfoBlock
        user={user}
        onEditOpen={() => setIsEdit(true)}
        className="tablet:col-span-full"
      />
      <MyOrdersBlock />
      <Favorites isOverview={true} className="col-span-full tablet:col-span-1" />
      <LogoutButton user={user} className="hidden tablet:flex col-span-full px-4" />
    </div>
  );
};
