'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Select({
  label,
  options,
  value,
  onChange,
  className,
  ...props
}: SelectProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <label className="text-sm font-medium text-secondary">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full bg-surface text-on-surface border border-outline-variant rounded-xl h-12 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-default"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-secondary">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
