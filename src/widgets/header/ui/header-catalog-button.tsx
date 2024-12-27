'use client';

import { useState } from 'react';
import { TextSearch, X } from 'lucide-react';

import { cn } from '@/shared/lib/tailwind-merge';

import { CategoriesMenu } from '@/widgets/categories-menu';
import { Button } from '@/shared/ui/button';

interface Props {
  className?: string;
}

export const HeaderCatalogButton = ({ className }: Props) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  if (isCatalogOpen) {
    return (
      <>
        <Button
          variant="destructive"
          className={cn('mr-5', className)}
          onClick={() => setIsCatalogOpen(false)}>
          <X />
          <p className="ml-3 font-bold">Каталог</p>
        </Button>
        <CategoriesMenu onClose={() => setIsCatalogOpen(false)} />
      </>
    );
  } else {
    return (
      <Button className={cn('mr-5', className)} onClick={() => setIsCatalogOpen(true)}>
        <TextSearch />
        <p className="ml-3 font-bold">Каталог</p>
      </Button>
    );
  }
};
