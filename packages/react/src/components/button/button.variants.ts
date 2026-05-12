/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-tp-2',
    'rounded-md font-medium tp-nums',
    'transition duration-fast ease-tp',
    'focus-visible:tp-focus-ring',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary:   'bg-primary-500 text-text-on-primary hover:bg-primary-600 active:bg-primary-700',
        secondary: 'bg-bg-surface text-text-primary border border-border hover:bg-bg-subtle',
        ghost:     'bg-transparent text-text-primary hover:bg-bg-subtle',
        danger:    'bg-danger-500 text-text-on-primary hover:bg-danger-600',
      },
      size: {
        sm: 'h-control-sm px-tp-3 text-caption',
        md: 'h-control-md px-tp-4 text-body',
        lg: 'h-control-lg px-tp-5 text-body',
      },
      iconOnly: { true: 'aspect-square px-0' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);
