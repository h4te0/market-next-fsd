import type { PropsWithChildren } from 'react';

import { getServerSession } from 'next-auth';

import { NotAuth, ProfileBreadcrumbs, ProfileNavMenu } from '@/pages/profile';
import { Container } from '@/shared/ui/container';

const ProfileLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();
  return (
    <Container>
      <ProfileBreadcrumbs />
      <div className="grid grid-cols-[296px,1fr] gap-4">
        <ProfileNavMenu session={session} />
        {!session ? <NotAuth /> : children}
      </div>
    </Container>
  );
};

export default ProfileLayout;
