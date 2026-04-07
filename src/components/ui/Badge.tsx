import React from 'react';
import { cn } from '@/lib/utils';

const statusStyles = {
  verified: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  unverified: 'bg-gray-100 text-gray-700',
  platformManaged: 'bg-red-100 text-red-800',
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: keyof typeof statusStyles;
}

export function Badge({ className, status, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        status ? statusStyles[status] : 'bg-gray-100 text-gray-700',
        className,
      )}
      {...props}
    />
  );
}
