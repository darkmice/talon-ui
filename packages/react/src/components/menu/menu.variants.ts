/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const menuContentVariants = cva(
  [
    'z-overlay min-w-[160px] max-w-[320px]',
    'rounded-md bg-bg-surface border border-border shadow-pop',
    'p-1',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
  ],
);

export const menuSubContentClass = 'z-overlay min-w-[160px] max-w-[320px] rounded-md bg-bg-surface border border-border shadow-pop p-1';

export const menuItemVariants = cva(
  [
    'flex w-full items-center gap-tp-2',
    'rounded-sm px-tp-2 h-8 text-body',
    'cursor-pointer select-none outline-none',
    'data-[highlighted]:bg-bg-subtle',
    'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
  ],
  {
    variants: {
      tone: {
        default: 'text-text-primary',
        danger: 'text-danger-500 data-[highlighted]:bg-[#FCE3E1]',
      },
    },
    defaultVariants: { tone: 'default' },
  },
);

export const menuLabelClass = 'px-tp-2 py-tp-1 text-caption uppercase tracking-[0.06em] text-text-tertiary';
export const menuSeparatorClass = '-mx-1 my-1 h-px bg-border';
export const menuShortcutClass = 'text-caption text-text-tertiary tabular-nums font-mono ml-auto';
