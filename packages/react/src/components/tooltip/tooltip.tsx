/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '../../primitives/cn.js';
import { tooltipContentVariants } from './tooltip.variants.js';
import type { TooltipContentProps } from './tooltip.types.js';

export const TooltipProvider = RadixTooltip.Provider;
export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  { className, sideOffset = 6, children, ...rest },
  ref,
) {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(tooltipContentVariants(), className)}
        {...rest}
      >
        {children}
        <RadixTooltip.Arrow className="fill-bg-inverse" width={10} height={6} />
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  );
});

TooltipContent.displayName = 'TooltipContent';
