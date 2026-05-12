/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const stepperRootVariants = cva('flex w-full', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-start',
      vertical: 'flex-col gap-tp-3',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const stepperIndicatorVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0',
    'rounded-pill border-[1.5px]',
    'transition duration-fast ease-tp',
    'select-none',
  ],
  {
    variants: {
      size: {
        sm: 'size-6',
        md: 'size-7',
      },
      status: {
        complete: 'bg-primary-500 border-primary-500 text-text-on-primary',
        current:  'bg-primary-500 border-primary-500 text-text-on-primary shadow-focus',
        idle:     'bg-bg-surface border-border-strong text-text-secondary',
        error:    'bg-bg-surface border-danger-500 text-danger-500',
      },
      clickable: {
        true: 'cursor-pointer hover:opacity-90 focus-visible:tp-focus-ring focus-visible:outline-none',
        false: '',
      },
    },
    defaultVariants: { size: 'md', status: 'idle', clickable: false },
  },
);

export const stepperConnectorVariants = cva('block', {
  variants: {
    orientation: {
      horizontal: 'h-px flex-1 mx-tp-2',
      vertical: 'w-px h-tp-6 ml-tp-3',
    },
    status: {
      complete: 'bg-primary-200',
      current:  'bg-primary-200',
      idle:     'bg-border',
      error:    'bg-border',
    },
  },
  defaultVariants: { orientation: 'horizontal', status: 'idle' },
});

export const stepperTitleVariants = cva('text-body', {
  variants: {
    status: {
      complete: 'text-text-primary',
      current: 'text-text-primary font-medium',
      idle: 'text-text-tertiary',
      error: 'text-danger-500',
    },
  },
  defaultVariants: { status: 'idle' },
});
