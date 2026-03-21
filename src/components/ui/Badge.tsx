import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'category' | 'status';
  status?: 'available' | 'rented' | 'maintenance' | 'unavailable' | 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = 'status',
  status = 'available',
  children,
  className,
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const statusStyles: Record<string, string> = {
    available: 'bg-emerald-100 text-emerald-800',
    rented: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-amber-100 text-amber-800',
    unavailable: 'bg-red-100 text-red-800',
    pending: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-blue-100 text-blue-800',
    active: 'bg-emerald-100 text-emerald-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const categoryStyles = 'bg-surface-container text-on-surface border border-outline-variant/50';

  const classes = cn(
    baseStyles,
    variant === 'status' ? statusStyles[status] : categoryStyles,
    className
  );

  return (
    <span className={classes}>
      {children}
    </span>
  );
}
