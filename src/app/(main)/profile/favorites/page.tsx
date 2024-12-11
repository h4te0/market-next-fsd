import { Favorites } from '@/pages/profile';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Избранное',
};

const ProfileFavoritesPage = () => {
  return <Favorites />;
};

export default ProfileFavoritesPage;
