/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode, MouseEventHandler } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { tagVariants } from './tag.variants.js';

export interface TagProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof tagVariants> {
  children?: ReactNode;
  dot?: boolean;
  removable?: boolean;
  removeLabel?: string;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
}
