import type { Category } from '@prisma/client';

interface IBrand {
  id: number;
  slug: string;
  title: string;
}

export interface ICategoriesWithChildren extends Category {
  brand: IBrand | null;
  children: ICategoriesWithChildren[];
}
