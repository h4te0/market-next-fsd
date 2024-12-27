'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/shared/lib/tailwind-merge';

interface Props {
  description: string;
}

export const ProductDescription = ({ description }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const expandDescription = () => {
    setExpanded(() => !expanded);
  };
  return (
    <div className="">
      <h3 className="font-bold text-xl mb-2">Описание</h3>
      <p className={cn('text-sm text-gray-500', expanded ? 'line-clamp-none' : 'line-clamp-4')}>
        {description}
      </p>
      <div className="flex justify-center" onClick={expandDescription}>
        <ChevronDown
          className={cn(
            'transition-transform duration-300 ease-in-out cursor-pointer',
            expanded ? 'rotate-180' : '',
          )}
        />
      </div>
    </div>
  );
};
