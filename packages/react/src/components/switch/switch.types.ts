/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef } from 'react';
import type { Root } from '@radix-ui/react-switch';
import type { VariantProps } from 'class-variance-authority';
import type { switchVariants } from './switch.variants.js';

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof Root>,
    VariantProps<typeof switchVariants> {}
