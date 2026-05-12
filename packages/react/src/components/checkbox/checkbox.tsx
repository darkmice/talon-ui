/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { checkboxVariants } from './checkbox.variants.js';
import type { CheckboxProps } from './checkbox.types.js';

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { className, size, tone, ...rest },
  ref,
) {
  return (
    <RadixCheckbox.Root ref={ref} className={cn(checkboxVariants({ size, tone }), className)} {...rest}>
      <RadixCheckbox.Indicator className="inline-flex items-center justify-center text-current">
        {rest.checked === 'indeterminate' ? (
          <Minus className="size-3" strokeWidth={2.5} aria-hidden />
        ) : (
          <Check className="size-3" strokeWidth={2.5} aria-hidden />
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
});

Checkbox.displayName = 'Checkbox';
