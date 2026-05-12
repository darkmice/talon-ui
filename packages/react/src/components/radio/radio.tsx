/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixRadio from '@radix-ui/react-radio-group';
import { cn } from '../../primitives/cn.js';
import { radioGroupVariants, radioItemVariants, radioIndicatorVariants } from './radio.variants.js';
import type { RadioGroupProps, RadioGroupItemProps } from './radio.types.js';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { className, orientation, ...rest },
  ref,
) {
  return (
    <RadixRadio.Root
      ref={ref}
      orientation={orientation ?? undefined}
      className={cn(radioGroupVariants({ orientation }), className)}
      {...rest}
    />
  );
});
RadioGroup.displayName = 'RadioGroup';

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(function RadioGroupItem(
  { className, size, tone, ...rest },
  ref,
) {
  return (
    <RadixRadio.Item ref={ref} className={cn(radioItemVariants({ size, tone }), className)} {...rest}>
      <RadixRadio.Indicator className="inline-flex items-center justify-center">
        <span className={cn(radioIndicatorVariants({ size, tone }))} />
      </RadixRadio.Indicator>
    </RadixRadio.Item>
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';
