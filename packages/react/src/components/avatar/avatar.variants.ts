/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center overflow-visible',
    'rounded-pill',
    'bg-bg-subtle',
    'text-text-secondary',
    'select-none',
    'align-middle',
  ],
  {
    variants: {
      size: {
        sm: 'w-[var(--tp-avatar-sm)] h-[var(--tp-avatar-sm)] text-caption',
        md: 'w-[var(--tp-avatar-md)] h-[var(--tp-avatar-md)] text-body',
        lg: 'w-[var(--tp-avatar-lg)] h-[var(--tp-avatar-lg)] text-base',
      },
      ring: {
        none: '',
        surface: 'ring-2 ring-bg-surface',
      },
    },
    defaultVariants: { size: 'md', ring: 'none' },
  },
);

export const avatarStatusVariants = cva(
  'absolute bottom-0 right-0 size-2 rounded-pill ring-2 ring-bg-surface',
  {
    variants: {
      status: {
        online: 'bg-status-done-fg',
        away: 'bg-status-pending-fg',
        offline: 'bg-text-tertiary',
      },
    },
  },
);
