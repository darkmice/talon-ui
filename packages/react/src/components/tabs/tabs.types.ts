/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef } from 'react';
import type { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import type { VariantProps } from 'class-variance-authority';
import type { tabsListVariants, tabsTriggerVariants } from './tabs.variants.js';

export type TabsProps = ComponentPropsWithoutRef<typeof Root>;

export interface TabsListProps
  extends ComponentPropsWithoutRef<typeof List>,
    VariantProps<typeof tabsListVariants> {}

export interface TabsTriggerProps
  extends ComponentPropsWithoutRef<typeof Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

export type TabsContentProps = ComponentPropsWithoutRef<typeof Content>;
