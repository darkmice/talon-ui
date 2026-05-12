/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { Root, Item, Trigger, Content } from '@radix-ui/react-accordion';

export type CollapseProps = ComponentPropsWithoutRef<typeof Root>;
export type CollapsePanelProps = ComponentPropsWithoutRef<typeof Item>;
export interface CollapseHeaderProps extends ComponentPropsWithoutRef<typeof Trigger> {
  extra?: ReactNode;
}
export type CollapseContentProps = ComponentPropsWithoutRef<typeof Content>;
