/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { VariantProps } from 'class-variance-authority';
import type { colorPickerTriggerVariants } from './color-picker.variants.js';

export interface ColorPickerProps extends VariantProps<typeof colorPickerTriggerVariants> {
  /** Controlled hex value e.g. "#3B4DE6" */
  value?: string;
  /** Uncontrolled initial hex value */
  defaultValue?: string;
  /** Called when a colour is committed (preset click, hex Enter, or native picker change) */
  onValueChange?: (value: string) => void;
  /** Preset swatch colours; defaults to Talon brand + utility palette */
  presets?: string[];
  /** Render the hex text input row */
  showHexInput?: boolean;
  /** Render the native <input type="color"> fallback */
  showSystemPicker?: boolean;
  /** Disables the trigger button */
  disabled?: boolean;
  /** aria-label on the trigger */
  label?: string;
  className?: string;
}
