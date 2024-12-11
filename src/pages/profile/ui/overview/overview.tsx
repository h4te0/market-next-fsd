'use client';

import { useState } from 'react';

import { MyOrdersBlock } from './my-orders/my-orders-block';
import { UserEditForm } from '@/features/update-user';
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
    <div className="grid grid-cols-2 gap-4">
      <UserInfoBlock user={user} onEditOpen={() => setIsEdit(true)} />
      <MyOrdersBlock />
      <div className="col-span-full">
        <Favorites isOverview={true} />
      </div>
    </div>
  );
};
