/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import {
  collapseRootVariants,
  collapsePanelClass,
  collapseHeaderClass,
  collapseContentClass,
} from './collapse.variants.js';
import type {
  CollapseProps,
  CollapsePanelProps,
  CollapseHeaderProps,
  CollapseContentProps,
} from './collapse.types.js';

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(function Collapse(
  { className, ...rest },
  ref,
) {
  return (
    <RadixAccordion.Root
      ref={ref}
      className={cn(collapseRootVariants(), className)}
      {...rest}
    />
  );
});
Collapse.displayName = 'Collapse';

export const CollapsePanel = forwardRef<HTMLDivElement, CollapsePanelProps>(function CollapsePanel(
  { className, ...rest },
  ref,
) {
  return (
    <RadixAccordion.Item
      ref={ref}
      className={cn(collapsePanelClass, className)}
      {...rest}
    />
  );
});
CollapsePanel.displayName = 'CollapsePanel';

export const CollapseHeader = forwardRef<HTMLButtonElement, CollapseHeaderProps>(
  function CollapseHeader({ className, extra, children, ...rest }, ref) {
    return (
      <RadixAccordion.Header className="flex">
        <RadixAccordion.Trigger
          ref={ref}
          className={cn(collapseHeaderClass, 'group/header', className)}
          {...rest}
        >
          <ChevronRight
            className="size-4 shrink-0 text-text-secondary transition-transform duration-fast ease-tp group-data-[state=open]/header:rotate-90"
            aria-hidden
          />
          <span className="flex-1 text-body-strong text-text-primary text-left">{children}</span>
          {extra && <span className="text-caption text-text-tertiary">{extra}</span>}
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
    );
  },
);
CollapseHeader.displayName = 'CollapseHeader';

export const CollapseContent = forwardRef<HTMLDivElement, CollapseContentProps>(
  function CollapseContent({ className, children, ...rest }, ref) {
    return (
      <RadixAccordion.Content
        ref={ref}
        className={cn(collapseContentClass, className)}
        {...rest}
      >
        <div className="pb-tp-3">{children}</div>
      </RadixAccordion.Content>
    );
  },
);
CollapseContent.displayName = 'CollapseContent';
