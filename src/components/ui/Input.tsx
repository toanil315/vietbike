'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  icon?: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Input({
  label,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  readOnly,
  ...props
}: InputProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <label className="text-sm font-medium text-secondary">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          className={cn(
            'w-full bg-surface text-on-surface border border-outline-variant rounded-xl h-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-default',
            Icon ? 'pl-10 pr-4' : 'px-4',
            readOnly && 'bg-surface-container-low text-secondary cursor-not-allowed border-transparent'
          )}
          {...props}
        />
      </div>
    </div>
  );
}
