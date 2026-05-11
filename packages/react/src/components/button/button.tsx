/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { buttonVariants } from './button.variants.js';
import type { ButtonProps } from './button.types.js';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size,
    iconOnly,
    asChild,
    leading,
    trailing,
    loading,
    disabled,
    children,
    type,
    ...rest
  },
  ref,
) {
  const Comp = asChild ? Slot : 'button';
  const icon = loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : leading;

  if (asChild) {
    return (
      <Comp
        ref={ref}
        disabled={disabled || loading || undefined}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        {...rest}
      >
        <Slottable>
          {children}
        </Slottable>
      </Comp>
    );
  }

  return (
    <Comp
      ref={ref}
      type={type ?? 'button'}
      disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      className={cn(buttonVariants({ variant, size, iconOnly }), className)}
      {...rest}
    >
      {icon}
      {children}
      {!loading && trailing}
    </Comp>
  );
});

Button.displayName = 'Button';
