import { Overview } from '@/pages/profile';

import { getCurrentUser } from '@/entities/user';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Профиль',
};

const ProfileOverviewPage = async () => {
  const user = await getCurrentUser();

  return <Overview user={user} />;
};

export default ProfileOverviewPage;
