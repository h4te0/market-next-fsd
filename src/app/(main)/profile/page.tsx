import { redirect } from 'next/navigation';

import { paths } from '@/shared/config/paths';

const ProfilePage = () => {
  return redirect(paths.profile.overview);
};

export default ProfilePage;
