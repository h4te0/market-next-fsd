import { cookies } from 'next/headers';
import { compare } from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/shared/api';

import type { AuthOptions } from 'next-auth';
import type { UserRole } from '@prisma/client';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'text' },
      },
      async authorize(credentials) {
        const cookieStore = await cookies();

        if (!credentials) return null;

        const findUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!findUser) return null;

        const isPasswordValid = await compare(credentials.password, findUser.password || '');

        if (!isPasswordValid || !findUser.verified) return null;

        let cartToken;

        if (findUser.cartToken) {
          cartToken = findUser.cartToken;
        } else if (cookieStore.get('cartToken')?.value) {
          cartToken = cookieStore.get('cartToken')?.value || '';
        } else {
          cartToken = crypto.randomUUID();
          cookieStore.set('cartToken', cartToken);
        }

        findUser.cartToken && cookieStore.set('cartToken', findUser.cartToken);

        await prisma.user.update({
          where: {
            id: findUser.id,
          },
          data: {
            cartToken,
          },
        });

        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const cookieStore = await cookies();

        if (account?.provider === 'credentials') return true;

        if (!user.email) return false;

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              {
                email: user.email,
              },
            ],
          },
        });

        let cartToken;

        if (findUser?.cartToken) {
          cartToken = findUser.cartToken;
        } else if (cookieStore.get('cartToken')?.value) {
          cartToken = cookieStore.get('cartToken')?.value || '';
        } else {
          cartToken = crypto.randomUUID();
          cookieStore.set('cartToken', cartToken);
        }

        findUser?.cartToken && cookieStore.set('cartToken', findUser.cartToken);

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
              cartToken,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || 'User #' + user.id,
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
            cartToken,
          },
        });

        return true;
      } catch (error) {
        console.error('Error [SIGNIN]', error);
        return false;
      }
    },
    async jwt({ token }) {
      if (!token.email) return token;

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
