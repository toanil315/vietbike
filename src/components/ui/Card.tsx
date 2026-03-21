import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export default function Card({
  className,
  children,
  as: Component = 'div',
}: CardProps) {
  return (
    <Component className={cn('bg-white rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden', className)}>
      {children}
    </Component>
  );
}
