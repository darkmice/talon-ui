/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { cn } from '../../primitives/cn.js';
import {
  sliderRootVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
} from './slider.variants.js';
import type { SliderProps } from './slider.types.js';

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(function Slider(
  { className, orientation = 'horizontal', tone, disabled, value, defaultValue, ...rest },
  ref,
) {
  const values = value ?? defaultValue ?? [0];
  // CVA VariantProps can produce `null`; Radix props expect `undefined`.
  const radixOrientation = orientation ?? undefined;
  const radixDisabled = disabled ?? undefined;
  return (
    <RadixSlider.Root
      ref={ref}
      orientation={radixOrientation}
      disabled={radixDisabled}
      value={value}
      defaultValue={defaultValue}
      className={cn(sliderRootVariants({ orientation, disabled }), className)}
      {...rest}
    >
      <RadixSlider.Track className={cn(sliderTrackVariants({ orientation }))}>
        <RadixSlider.Range className={cn(sliderRangeVariants({ orientation, tone }))} />
      </RadixSlider.Track>
      {values.map((_v, i) => (
        <RadixSlider.Thumb
          key={i}
          aria-label={`Value ${i + 1}`}
          className={cn(sliderThumbVariants({ tone }))}
        />
      ))}
    </RadixSlider.Root>
  );
});

Slider.displayName = 'Slider';
