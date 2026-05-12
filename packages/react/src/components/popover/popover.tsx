/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { X } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { popoverContentVariants } from './popover.variants.js';
import type { PopoverContentProps, PopoverCloseProps, PopoverArrowProps } from './popover.types.js';

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { className, sideOffset = 6, width, ...rest },
  ref,
) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(popoverContentVariants({ width }), className)}
        {...rest}
      />
    </RadixPopover.Portal>
  );
});
PopoverContent.displayName = 'PopoverContent';

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(function PopoverClose(
  { className, ...rest },
  ref,
) {
  return (
    <RadixPopover.Close
      ref={ref}
      aria-label="Close"
      className={cn(
        'absolute top-tp-2 right-tp-2 inline-flex items-center justify-center size-6 rounded-sm',
        'text-text-tertiary hover:text-text-primary hover:bg-bg-subtle',
        'focus-visible:tp-focus-ring focus-visible:outline-none',
        className,
      )}
      {...rest}
    >
      <X className="size-4" aria-hidden />
    </RadixPopover.Close>
  );
});
PopoverClose.displayName = 'PopoverClose';

export const PopoverArrow = forwardRef<SVGSVGElement, PopoverArrowProps>(function PopoverArrow(
  { className, ...rest },
  ref,
) {
  return (
    <RadixPopover.Arrow ref={ref} className={cn('fill-bg-surface', className)} width={12} height={6} {...rest} />
  );
});
PopoverArrow.displayName = 'PopoverArrow';
