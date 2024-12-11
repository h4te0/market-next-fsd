import Link from 'next/link';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/shared/lib/tailwind-merge';

import { paths } from '@/shared/config/paths';

import type { Dispatch, SetStateAction } from 'react';
import type { ICategoriesWithChildren } from '../model/categories-with-children';

interface Props {
  category: ICategoriesWithChildren;
  currentCategory?: ICategoriesWithChildren;
  setCurrentCategory: Dispatch<SetStateAction<ICategoriesWithChildren | undefined>>;
  onClose: () => void;
}

export const RootCategoryItem = ({
  category,
  currentCategory,
  setCurrentCategory,
  onClose,
}: Props) => {
  const debouncedHandle = debounce((category) => setCurrentCategory(category), 300);

  return (
    <li
      onMouseEnter={() => debouncedHandle(category)}
      onMouseLeave={debouncedHandle.cancel}
      onClick={onClose}>
      <Link
        href={`${paths.catalog}/${category.slug}`}
        className={cn(
          'flex items-center border-b p-2 hover:text-primary',
          currentCategory?.id === category.id && 'text-primary',
        )}>
        <div className="flex items-center justify-center mr-2 h-5 w-5">
          <Image src={category.image || ''} alt="category" width={20} height={20} />
        </div>
        <p className="flex-shrink flex-grow">{category.title}</p>
        <ChevronRight width={16} height={16} />
      </Link>
    </li>
  );
};
