/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { badgePillVariants } from './badge.variants.js';

type PillVariants = VariantProps<typeof badgePillVariants>;

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'>,
    Pick<PillVariants, 'tone'> {
  count?: number;
  max?: number;                // default 99
  dot?: boolean;               // when true, render dot variant; count is ignored
  showZero?: boolean;          // when false (default), count=0 is hidden
  children?: ReactNode;        // optional wrapped content
  label?: string;              // aria-label override
}
