'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  href?: string;
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  href,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-container focus:ring-primary',
    secondary: 'bg-white text-on-surface border border-outline-variant hover:bg-surface-container focus:ring-secondary',
    ghost: 'bg-transparent text-secondary hover:bg-surface-container hover:text-on-surface focus:ring-secondary',
    outline: 'bg-transparent border border-outline text-on-surface hover:bg-surface-container focus:ring-outline',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {Icon && <Icon className={cn('mr-2', size === 'sm' ? 'w-4 h-4' : 'w-5 h-5')} />}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {Icon && <Icon className={cn('mr-2', size === 'sm' ? 'w-4 h-4' : 'w-5 h-5')} />}
      {children}
    </button>
  );
}
