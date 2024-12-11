'use client';

import { useSearchParams } from 'next/navigation';

import { cn } from '@/shared/lib/tailwind-merge';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';

interface Props {
  page?: string | null;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  classname?: string;
}

export const ProductsPagination = (props: Props) => {
  const { totalPages, hasNextPage, hasPrevPage, classname } = props;

  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const page = searchParams?.get('page') || 1;
  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);
  const query = new URLSearchParams(searchParams?.toString());
  query.delete('page');
  const queryString = query.toString() ? `&${query}` : '';

  const getPagesToShow = () => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    }
    if (totalPages < 5) {
      endPage = totalPages;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  const pages = getPagesToShow();

  return (
    <Pagination className={cn(classname)}>
      <PaginationContent className="w-full flex justify-center">
        <PaginationItem>
          <div className="w-10 h-10">
            {hasPrevPage && (
              <PaginationPrevious href={'?page=' + (currentPage - 1) + queryString} />
            )}
          </div>
        </PaginationItem>
        {pages.map((page, i) => (
          <PaginationItem key={i}>
            <PaginationLink href={'?page=' + page + queryString} isActive={currentPage === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <div className="w-10 h-10">
            {hasNextPage && <PaginationNext href={'?page=' + (currentPage + 1) + queryString} />}
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
