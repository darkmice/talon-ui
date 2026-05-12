/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const titleVariants = cva('font-semibold text-text-primary tracking-tight', {
  variants: {
    level: {
      display: 'text-display',
      1: 'text-h1',
      2: 'text-h2',
      3: 'text-h3',
    },
    tone: {
      primary:   'text-text-primary',
      secondary: 'text-text-secondary',
      tertiary:  'text-text-tertiary',
      inverse:   'text-text-on-primary',
    },
  },
  defaultVariants: { level: 1, tone: 'primary' },
});

export const textVariants = cva('', {
  variants: {
    variant: {
      body:          'text-body',
      'body-strong': 'text-body-strong font-medium',
      caption:       'text-caption',
      'mono-sm':     'text-mono-sm font-mono',
    },
    tone: {
      primary:   'text-text-primary',
      secondary: 'text-text-secondary',
      tertiary:  'text-text-tertiary',
      inverse:   'text-text-on-primary',
    },
    nums: { true: 'tp-nums' },
  },
  defaultVariants: { variant: 'body', tone: 'primary' },
});

export const paragraphVariants = cva('text-body text-text-primary leading-[22px]', {
  variants: {
    tone: {
      primary:   'text-text-primary',
      secondary: 'text-text-secondary',
      tertiary:  'text-text-tertiary',
    },
    spacing: {
      tight:  'mb-tp-1',
      normal: 'mb-tp-3',
      loose:  'mb-tp-5',
      none:   'mb-0',
    },
  },
  defaultVariants: { tone: 'primary', spacing: 'normal' },
});

export const linkVariants = cva(
  'text-text-link no-underline transition duration-fast ease-tp hover:underline focus-visible:tp-focus-ring focus-visible:outline-none',
  {
    variants: {
      tone: {
        primary: 'text-primary-600 hover:text-primary-700',
        muted:   'text-text-secondary hover:text-text-primary',
      },
    },
    defaultVariants: { tone: 'primary' },
  },
);
