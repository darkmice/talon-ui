/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { comboboxTriggerVariants, comboboxItemClass } from './combobox.variants.js';

export interface ComboboxProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface ComboboxTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof comboboxTriggerVariants> {}

export interface ComboboxContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

export interface ComboboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof comboboxItemClass> {
  value: string;
  disabled?: boolean;
  /** Called when the item is selected. Receives the item value string. */
  onSelect?: (value: string) => void;
}
