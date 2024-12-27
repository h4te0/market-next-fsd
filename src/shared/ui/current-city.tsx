import { MapPin } from 'lucide-react';
import { cn } from '../lib/tailwind-merge';

interface Props {
  className?: string;
}

export const CurrentCity = ({ className }: Props) => {
  return (
    <button className={cn('flex items-center gap-1 text-secondary', className)}>
      <MapPin width={20} />
      <p className="font-bold text-sm tablet:text-base">Астана</p>
    </button>
  );
};
