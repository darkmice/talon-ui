/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef } from 'react';
import type { Root, Item } from '@radix-ui/react-radio-group';
import type { VariantProps } from 'class-variance-authority';
import type { radioGroupVariants, radioItemVariants } from './radio.variants.js';

export interface RadioGroupProps
  extends Omit<ComponentPropsWithoutRef<typeof Root>, 'orientation'>,
    VariantProps<typeof radioGroupVariants> {}

export interface RadioGroupItemProps
  extends ComponentPropsWithoutRef<typeof Item>,
    VariantProps<typeof radioItemVariants> {}
