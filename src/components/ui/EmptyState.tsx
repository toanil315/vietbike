'use client';

import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center bg-surface-container/50 rounded-3xl border border-outline-variant/30', className)}>
      {Icon && (
        <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-6 text-secondary">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
      <p className="text-secondary max-w-sm mb-6">{description}</p>
      
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
}
