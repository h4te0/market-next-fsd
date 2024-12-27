import { Menu } from 'lucide-react';
import { cn } from '../lib/tailwind-merge';

interface Props {
  className?: string;
}

export const Burger = ({ className }: Props) => {
  return (
    <div className={cn('cursor-pointer', className)}>
      <Menu />
    </div>
  );
};
