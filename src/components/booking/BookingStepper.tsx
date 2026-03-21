'use client';

import { LucideIcon, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  name: string;
  icon: LucideIcon;
}

interface BookingStepperProps {
  currentStep: number;
  steps: Step[];
}

export default function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <div className="bg-white rounded-[2rem] p-8 mb-12 shadow-sm border border-outline-variant/10">
      <div className="flex justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-surface-container -translate-y-1/2 z-0"></div>
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 border-white shadow-lg",
              currentStep >= s.id ? "bg-primary text-white scale-110" : "bg-surface-container text-secondary"
            )}>
              {currentStep > s.id ? <CheckCircle2 size={24} /> : <s.icon size={24} />}
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
              currentStep >= s.id ? "text-primary" : "text-secondary"
            )}>
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
