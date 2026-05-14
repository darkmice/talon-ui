/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { segmentedControlRootVariants } from './segmented-control.variants.js';

export interface SegmentedControlItem<T extends string = string> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    VariantProps<typeof segmentedControlRootVariants> {
  items: SegmentedControlItem<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  disabled?: boolean;
}
