/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const selectTriggerVariants = cva(
  [
    'inline-flex items-center justify-between gap-tp-2 w-full',
    'rounded-md bg-bg-surface border border-border',
    'text-text-primary',
    'transition duration-fast ease-tp',
    'focus:tp-focus-ring focus:border-primary-500 focus:outline-none',
    'data-[state=open]:tp-focus-ring data-[state=open]:border-primary-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'data-[placeholder]:text-text-tertiary',
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

export const selectContentVariants = cva(
  [
    'z-overlay overflow-hidden rounded-md',
    'bg-bg-surface border border-border shadow-pop',
    'p-1',
    'min-w-[var(--radix-select-trigger-width)]',
    'max-h-[var(--radix-select-content-available-height)]',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1',
  ],
);

export const selectItemVariants = cva(
  [
    'relative flex w-full items-center rounded-sm',
    'h-8 px-tp-2 pr-tp-7 text-body',
    'cursor-pointer select-none',
    'outline-none',
    'data-[highlighted]:bg-bg-subtle',
    'data-[state=checked]:bg-[var(--tp-interactive-bg-selected)] data-[state=checked]:text-[var(--tp-interactive-fg-selected)] data-[state=checked]:font-medium',
    'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
  ],
  {
    variants: {
      tone: {
        default: 'text-text-primary',
        danger: 'text-[#C8322B] data-[highlighted]:bg-[#FCE3E1]',
      },
    },
    defaultVariants: { tone: 'default' },
  },
);

export const selectLabelClass = 'px-tp-2 py-tp-1 text-caption uppercase tracking-[0.06em] text-text-tertiary';
export const selectSeparatorClass = '-mx-1 my-1 h-px bg-border';
