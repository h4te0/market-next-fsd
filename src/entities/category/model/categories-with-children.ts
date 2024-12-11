import type { Category } from '@prisma/client';

export interface ICategoriesWithChildren extends Category {
  children: [
    ICategoriesWithChildren & {
      brand: {
        id: number;
        slug: string;
        title: string;
      };
    },
  ];
}
