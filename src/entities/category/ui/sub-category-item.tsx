import Link from 'next/link';

import { paths } from '@/shared/config/paths';

import type { ICategoriesWithChildren } from '../model/categories-with-children';

interface Props {
  categoryChildren: ICategoriesWithChildren;
  currentCategory: ICategoriesWithChildren;
  subCategory: ICategoriesWithChildren;
  onClose: () => void;
}

export const SubCategoryItem = ({
  categoryChildren,
  currentCategory,
  subCategory,
  onClose,
}: Props) => {
  return (
    <li onClick={onClose}>
      <Link
        href={
          `${paths.catalog}/${currentCategory.slug}/${subCategory.slug}/${categoryChildren.slug}` +
          `${categoryChildren.brand ? '?brands=' + categoryChildren.brand.slug : ''}`
        }>
        <p className="text-[12px] font-medium hover:text-primary">{categoryChildren.title}</p>
      </Link>
    </li>
  );
};
