/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const segmentedControlRootVariants = cva(
  ['inline-flex rounded-lg border border-border bg-bg-subtle p-1'],
  {
    variants: {
      size: {
        sm: 'gap-0.5',
        md: 'gap-1',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const segmentedControlItemVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center select-none',
    'rounded-md transition-colors duration-fast ease-tp',
    'focus-visible:tp-focus-ring focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-1 text-[12px]',
        md: 'px-4 py-1.5 text-[13px]',
      },
      selected: {
        true: 'bg-bg-surface font-medium text-text-primary shadow-[0_1px_3px_rgba(15,23,42,0.12),0_1px_2px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.08)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)]',
        false: 'text-text-secondary hover:text-text-primary hover:bg-bg-surface/40',
      },
    },
    defaultVariants: { size: 'md', selected: false },
  },
);
