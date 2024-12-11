'use client';

import { useState } from 'react';
import { TextSearch, X } from 'lucide-react';

import { CategoriesMenu } from '@/widgets/categories-menu';
import { Button } from '@/shared/ui/button';

export const HeaderCatalogButton = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  if (isCatalogOpen) {
    return (
      <>
        <Button variant="destructive" className="mr-5" onClick={() => setIsCatalogOpen(false)}>
          <X />
          <p className="ml-3 font-bold">Каталог</p>
        </Button>
        <CategoriesMenu onClose={() => setIsCatalogOpen(false)} />
      </>
    );
  } else {
    return (
      <Button className="mr-5" onClick={() => setIsCatalogOpen(true)}>
        <TextSearch />
        <p className="ml-3 font-bold">Каталог</p>
      </Button>
    );
  }
};
