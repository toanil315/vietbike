import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary-container">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-on-surface">{title}</h3>
        {subtitle && <p className="text-sm text-secondary">{subtitle}</p>}
      </div>
    </div>
  );
}
