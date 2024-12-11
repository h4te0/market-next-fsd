import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/config/auth/auth-options';
import { prisma } from '@/shared/api/prisma-client';

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const user = await prisma.user.findFirst({
    where: { id: Number(session.user.id) },
    include: {
      cart: true,
      favorites: true,
    },
  });

  return user;
};
