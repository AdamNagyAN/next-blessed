'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SearchParams } from '@/app/shop/types/SearchParams';
import { usePathname, useRouter } from 'next/navigation';

const PAGINATION_OFFSET: number = 2;

const generateNumbers = (
  pageCount: number,
  currentPage: number,
  offset: number
): number[] => {
  let start = currentPage - offset;
  if (start < 1) {
    start = 1;
  } else if (start > pageCount - offset * 2) {
    start = Math.max(1, pageCount - offset * 2);
  }

  return Array.from(Array(offset * 2 + 1).keys())
    .map((number) => {
      const pageNumber = start + number;
      return pageNumber <= pageCount ? pageNumber : null;
    })
    .filter((it) => it !== null) as number[];
};

interface PaginationProps {
  searchParams: SearchParams;
  pageCount: number;
}
const Pagination: React.FC<PaginationProps> = ({
  searchParams,
  pageCount
}) => {
  const router = useRouter();
  const path = usePathname();
  const currentPage = Number.isInteger(Number(searchParams.page))
    ? Number(searchParams.page)
    : 1;

  console.log({
    numbers: generateNumbers(10, 1, PAGINATION_OFFSET)
  });

  const numbers = generateNumbers(
    pageCount,
    currentPage,
    PAGINATION_OFFSET
  );
  const hasNext = currentPage < pageCount;
  const hasPrevious = currentPage > 1;

  const onNext = () => setPage(currentPage + 1);
  const onPrevious = () => setPage(currentPage - 1);

  const setPage = (page: number) => {
    const newSearchParams = new URLSearchParams({
      ...searchParams,
      page: page.toString()
    });
    router.push(`${path}?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex gap-2">
      {hasPrevious && (
        <Button variant="secondary" onClick={onPrevious}>
          <ArrowLeft />
        </Button>
      )}

      {numbers.map((number) => (
        <Button
          variant={currentPage === number ? undefined : 'secondary'}
          key="number"
          onClick={() => setPage(number)}>
          {number}
        </Button>
      ))}
      {hasNext && (
        <Button variant="secondary" onClick={onNext}>
          <ArrowRight />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
