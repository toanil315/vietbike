'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 p-0 rounded-xl"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(page)}
            className={cn(
              'w-10 h-10 p-0 rounded-xl font-medium',
              currentPage !== page && 'text-secondary font-normal'
            )}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 p-0 rounded-xl"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
