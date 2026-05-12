/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef } from 'react';
import type { Root } from '@radix-ui/react-slider';
import type { VariantProps } from 'class-variance-authority';
import type { sliderRootVariants, sliderRangeVariants } from './slider.variants.js';

export interface SliderProps
  extends Omit<ComponentPropsWithoutRef<typeof Root>, 'orientation' | 'disabled'>,
    VariantProps<typeof sliderRootVariants>,
    VariantProps<typeof sliderRangeVariants> {}
