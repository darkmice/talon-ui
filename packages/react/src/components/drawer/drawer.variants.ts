/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const drawerOverlayClass =
  'fixed inset-0 z-modal bg-[rgba(15,23,42,0.4)] data-[state=open]:animate-in data-[state=closed]:animate-out';

export const drawerContentVariants = cva(
  [
    'fixed z-modal flex flex-col',
    'bg-bg-surface text-text-primary',
    'shadow-[var(--tp-shadow-modal)] border border-border',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'focus:outline-none',
  ],
  {
    variants: {
      side: {
        right: 'top-0 right-0 h-full',
        left: 'top-0 left-0 h-full',
        top: 'top-0 left-0 right-0',
        bottom: 'bottom-0 left-0 right-0',
      },
      size: { sm: '', md: '', lg: '' },
    },
    compoundVariants: [
      { side: 'right',  size: 'sm', class: 'w-[400px] max-w-full' },
      { side: 'right',  size: 'md', class: 'w-[520px] max-w-full' },
      { side: 'right',  size: 'lg', class: 'w-[720px] max-w-full' },
      { side: 'left',   size: 'sm', class: 'w-[400px] max-w-full' },
      { side: 'left',   size: 'md', class: 'w-[520px] max-w-full' },
      { side: 'left',   size: 'lg', class: 'w-[720px] max-w-full' },
      { side: 'top',    size: 'sm', class: 'h-[200px]' },
      { side: 'top',    size: 'md', class: 'h-[320px]' },
      { side: 'top',    size: 'lg', class: 'h-[480px]' },
      { side: 'bottom', size: 'sm', class: 'h-[200px]' },
      { side: 'bottom', size: 'md', class: 'h-[320px]' },
      { side: 'bottom', size: 'lg', class: 'h-[480px]' },
    ],
    defaultVariants: { side: 'right', size: 'md' },
  },
);
