'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function ToggleGroup({
  options,
  value,
  onChange,
  className,
}: ToggleGroupProps) {
  return (
    <div className={cn('inline-flex bg-surface-container rounded-xl p-1', className)}>
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex-1 whitespace-nowrap',
              isSelected
                ? 'bg-white text-primary shadow-sm'
                : 'text-secondary hover:text-on-surface hover:bg-surface-container-high'
            )}
            aria-pressed={isSelected}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
