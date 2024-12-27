import { cn } from '../lib/tailwind-merge';

interface Props {
  count: number;
  className?: string;
}

export const NavCountBadge = ({ count, className }: Props) => {
  return (
    <div
      className={cn(
        'absolute -right-2 -top-2 bg-secondary rounded-full text-white font-bold w-5 h-5 text-xs flex justify-center items-center',
        className,
      )}>
      {count}
    </div>
  );
};
