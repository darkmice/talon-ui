/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const comboboxTriggerVariants = cva(
  [
    'inline-flex items-center justify-between gap-tp-2 w-full',
    'rounded-md bg-bg-surface border border-border text-text-primary',
    'transition duration-fast ease-tp',
    'focus:tp-focus-ring focus:border-primary-500 focus:outline-none',
    'data-[state=open]:tp-focus-ring data-[state=open]:border-primary-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'h-control-sm px-tp-2 text-caption',
        md: 'h-control-md px-tp-3 text-body',
        lg: 'h-control-lg px-tp-4 text-body',
      },
      tone: {
        default: '',
        invalid: 'border-[#C8322B] focus:border-[#C8322B]',
      },
    },
    defaultVariants: { size: 'md', tone: 'default' },
  },
);

export const comboboxContentClass =
  'z-overlay overflow-hidden rounded-md bg-bg-surface border border-border shadow-pop min-w-[var(--radix-popover-trigger-width)] max-h-72';

export const comboboxInputClass =
  'flex-1 bg-transparent outline-none text-body placeholder:text-text-tertiary text-text-primary';

export const comboboxItemClass = cva(
  [
    'relative flex w-full items-center rounded-sm cursor-pointer select-none',
    'h-8 px-tp-2 text-body outline-none',
    'data-[selected=true]:bg-bg-subtle',
    'data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed',
  ],
  {
    variants: {
      tone: {
        default: 'text-text-primary',
        danger: 'text-[#C8322B] data-[selected=true]:bg-[#FCE3E1]',
      },
    },
    defaultVariants: { tone: 'default' },
  },
);

export const comboboxLabelClass =
  'px-tp-2 py-tp-1 text-caption uppercase tracking-[0.06em] text-text-tertiary';

export const comboboxEmptyClass = 'p-tp-4 text-center text-caption text-text-secondary';
