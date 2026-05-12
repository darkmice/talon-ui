/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';

export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
  label: ReactNode;
  value: number | string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  precision?: number;
  delta?: number;
  deltaDirection?: 'up' | 'down' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center';
}
