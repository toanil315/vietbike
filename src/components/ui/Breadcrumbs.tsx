import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link 
                  href={item.href} 
                  className="text-secondary hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-on-surface font-medium" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight className="w-4 h-4 mx-2 text-outline-variant" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
