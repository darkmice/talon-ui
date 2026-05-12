/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { cn } from '../../primitives/cn.js';
import { dividerVariants } from './divider.variants.js';
import type { DividerProps } from './divider.types.js';

export const Divider = forwardRef<HTMLElement, DividerProps>(function Divider(
  { className, orientation = 'horizontal', tone, children, ...rest },
  ref,
) {
  if (orientation === 'vertical') {
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        role="separator"
        aria-orientation="vertical"
        className={cn(dividerVariants({ orientation: 'vertical', tone }), 'h-4', className)}
        {...rest}
      />
    );
  }

  if (children !== undefined && children !== null && children !== false) {
    const borderClasses = dividerVariants({ orientation: 'horizontal', tone })
      .split(' ')
      .filter((c) => c.startsWith('border-'))
      .join(' ');

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="horizontal"
        className={cn('flex items-center gap-tp-3 w-full', className)}
        {...rest}
      >
        <span aria-hidden className={cn('flex-1 border-0 border-t', borderClasses)} />
        <span className="text-caption text-text-secondary uppercase tracking-[0.06em]">
          {children}
        </span>
        <span aria-hidden className={cn('flex-1 border-0 border-t', borderClasses)} />
      </div>
    );
  }

  return (
    <hr
      ref={ref as React.Ref<HTMLHRElement>}
      role="separator"
      aria-orientation="horizontal"
      className={cn(dividerVariants({ orientation: 'horizontal', tone }), className)}
      {...rest}
    />
  );
});

Divider.displayName = 'Divider';
