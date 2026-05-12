/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import { cn } from '../../primitives/cn.js';
import { switchVariants, switchThumbVariants } from './switch.variants.js';
import type { SwitchProps } from './switch.types.js';

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, size, tone, ...rest },
  ref,
) {
  return (
    <RadixSwitch.Root ref={ref} className={cn(switchVariants({ size, tone }), className)} {...rest}>
      <RadixSwitch.Thumb className={cn(switchThumbVariants({ size }))} />
    </RadixSwitch.Root>
  );
});

Switch.displayName = 'Switch';
