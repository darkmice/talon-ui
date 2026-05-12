/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ButtonHTMLAttributes } from 'react';
import type { DateRange, Matcher } from 'react-day-picker';
import type { VariantProps } from 'class-variance-authority';
import type { datePickerTriggerVariants } from './date-picker.variants.js';

export type DatePickerSingleProps = {
  mode?: 'single';
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (value: Date | undefined) => void;
};

export type DatePickerRangeProps = {
  mode: 'range';
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange | undefined) => void;
};

export type DatePickerProps = (DatePickerSingleProps | DatePickerRangeProps) & {
  placeholder?: string;
  format?: string;
  disabledDates?: Matcher | Matcher[];
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  disabled?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'defaultValue' | 'value'>
  & VariantProps<typeof datePickerTriggerVariants>;
