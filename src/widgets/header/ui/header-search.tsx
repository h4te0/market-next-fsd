'use client';

import { Search } from 'lucide-react';

import { Input } from '@/shared/ui/input';

import { cn } from '@/shared/lib/tailwind-merge';

interface Props {
  className?: string;
}

export const HeaderSearch = ({ className }: Props) => {
  return (
    <div className={cn('relative flex items-center w-full mr-5 tablet:m-0', className)}>
      <Input placeholder="Поиск" className="py-3 px-4 text-base bg-background tablet:h-10" />
      <Search width={20} color="#8E979F" className="absolute right-3 cursor-pointer" />
    </div>
  );
};
