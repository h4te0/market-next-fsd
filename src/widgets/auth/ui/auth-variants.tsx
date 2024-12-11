import { signIn } from 'next-auth/react';

import { Button } from '@/shared/ui/button';

interface Props {}

export const AuthVariants = ({}: Props) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="link"
        onClick={() =>
          signIn('github', {
            callbackUrl: '/',
            redirect: true,
          })
        }
        type="button"
        className="gap-2 h-12 p-2 flex-1">
        <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
        GitHub
      </Button>

      <Button
        variant="link"
        onClick={() =>
          signIn('google', {
            callbackUrl: '/',
            redirect: true,
          })
        }
        type="button"
        className="gap-2 h-12 p-2 flex-1">
        <img
          className="w-6 h-6"
          src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        />
        Google
      </Button>
    </div>
  );
};
