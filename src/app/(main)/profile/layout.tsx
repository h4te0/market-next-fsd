import type { PropsWithChildren } from 'react';

import { getCurrentUser } from '@/entities/user';

import { NotAuth, ProfileBreadcrumbs, ProfileNavMenu } from '@/pages/profile';
import { Container } from '@/shared/ui/container';

const ProfileLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUser();

  return (
    <Container>
      <ProfileBreadcrumbs className="tablet:hidden" />
      <div className="grid grid-cols-[296px,1fr] gap-4 tablet:block">
        <ProfileNavMenu user={user} className="tablet:hidden" />
        {!user ? <NotAuth /> : children}
      </div>
    </Container>
  );
};

export default ProfileLayout;
