/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  value: number;
  max?: number;
  type?: 'linear' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  status?: 'normal' | 'success' | 'warning' | 'error';
  showInfo?: boolean;
  format?: (value: number, max: number) => ReactNode;
  strokeWidth?: number;
  label?: string;
}
