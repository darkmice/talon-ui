/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ButtonHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { timePickerTriggerVariants } from './time-picker.variants.js';

export interface TimePickerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'defaultValue'>,
    VariantProps<typeof timePickerTriggerVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  withSeconds?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  placeholder?: string;
  disabled?: boolean;
  /** @future v0.4 — AM/PM toggle (not implemented in Phase 1) */
  format12h?: boolean;
}
