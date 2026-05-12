/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes } from 'react';

export interface RateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  allowHalf?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
  label?: string;
}
