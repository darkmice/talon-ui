/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';

export const descriptionsRowClass = cva('', {
  variants: {
    size: {
      sm: 'min-h-7',
      md: 'min-h-8',
    },
  },
  defaultVariants: { size: 'md' },
});

export const descriptionsLabelClass = 'text-caption text-text-secondary';

export const descriptionsValueClass = cva('text-body text-text-primary', {
  variants: {
    mono: {
      true: 'font-mono text-mono-sm tp-nums',
      false: '',
    },
  },
  defaultVariants: { mono: false },
});
