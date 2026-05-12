/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef } from 'react';
import { Root } from '@radix-ui/react-checkbox';
import type { VariantProps } from 'class-variance-authority';
import type { checkboxVariants } from './checkbox.variants.js';

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<typeof Root>, 'asChild'>,
    VariantProps<typeof checkboxVariants> {}
