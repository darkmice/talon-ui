/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type {
  Root, Trigger, Content, Item, SubTrigger, CheckboxItem, RadioItem,
} from '@radix-ui/react-dropdown-menu';
import type { VariantProps } from 'class-variance-authority';
import type { menuItemVariants } from './menu.variants.js';

export type MenuProps = ComponentPropsWithoutRef<typeof Root>;
export type MenuTriggerProps = ComponentPropsWithoutRef<typeof Trigger>;
export type MenuContentProps = ComponentPropsWithoutRef<typeof Content>;

export interface MenuItemProps
  extends ComponentPropsWithoutRef<typeof Item>,
    VariantProps<typeof menuItemVariants> {
  icon?: ReactNode;
  shortcut?: ReactNode;
}

export interface MenuSubTriggerProps
  extends ComponentPropsWithoutRef<typeof SubTrigger> {
  icon?: ReactNode;
}

export type MenuCheckboxItemProps = ComponentPropsWithoutRef<typeof CheckboxItem>;
export type MenuRadioItemProps = ComponentPropsWithoutRef<typeof RadioItem>;
