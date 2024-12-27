import Image from 'next/image';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Container } from '@/shared/ui/container';

import { paths } from '@/shared/config/paths';

import type { ICategoriesWithChildren } from '@/entities/category';

interface Props {
  categories?: ICategoriesWithChildren[];
  parentSlug?: string;
}

export const CategoryPage = ({ categories, parentSlug }: Props) => {
  return (
    <Container classname="bg-white">
      <Accordion type="single" collapsible>
        {categories?.map((category) => (
          <AccordionItem
            key={category.id}
            value={`item-${category.id}`}
            className="bg-white px-4 border-b">
            <AccordionTrigger>
              <div className="flex items-center gap-4">
                <Image
                  src={category.image || ''}
                  alt="category"
                  width={48}
                  height={48}
                  className="aspect-square h-12"
                />
                <p>{category.title}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 border-t">
              <Link
                className="flex w-full py-2"
                href={`${paths.catalog}/${parentSlug}/${category.slug}`}>
                Все товары
              </Link>
            </AccordionContent>

            {category.children.map((child) => (
              <AccordionContent key={child.id} className="p-0 border-t">
                <Link
                  className="flex w-full py-2"
                  href={
                    `${paths.catalog}/${parentSlug}/${category.slug}/${child.slug}` +
                    `${child.brand ? '?brands=' + child.brand.slug : ''}`
                  }>
                  {child.title}
                </Link>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};
