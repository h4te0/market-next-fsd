import Link from 'next/link';

import { cn } from '../lib/tailwind-merge';

import { paths } from '../config/paths';

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => {
  return (
    <Link className={cn('font-extrabold text-2xl mr-5', className)} href={paths.home}>
      Market
    </Link>
  );
};
