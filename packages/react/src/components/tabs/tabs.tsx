/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '../../primitives/cn.js';
import { tabsListVariants, tabsTriggerVariants } from './tabs.variants.js';
import type {
  TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps,
} from './tabs.types.js';

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(props, ref) {
  return <RadixTabs.Root ref={ref} {...props} />;
});
Tabs.displayName = 'Tabs';

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, size, ...rest },
  ref,
) {
  return (
    <RadixTabs.List ref={ref} className={cn(tabsListVariants({ size }), className)} {...rest} />
  );
});
TabsList.displayName = 'TabsList';

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { className, size, ...rest },
  ref,
) {
  return (
    <RadixTabs.Trigger ref={ref} className={cn(tabsTriggerVariants({ size }), className)} {...rest} />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { className, ...rest },
  ref,
) {
  return (
    <RadixTabs.Content
      ref={ref}
      className={cn('pt-tp-4 focus-visible:tp-focus-ring focus-visible:outline-none rounded-sm', className)}
      {...rest}
    />
  );
});
TabsContent.displayName = 'TabsContent';
