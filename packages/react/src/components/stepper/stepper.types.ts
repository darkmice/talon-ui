/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';

export type StepperStatus = 'complete' | 'current' | 'idle' | 'error';

export interface StepperStep {
  title: ReactNode;
  description?: ReactNode;
  status?: StepperStatus;
  icon?: ReactNode;
}

export interface StepperProps extends Omit<HTMLAttributes<HTMLOListElement>, 'children'> {
  steps: StepperStep[];
  current: number;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md';
  onStepClick?: (index: number) => void;
}
