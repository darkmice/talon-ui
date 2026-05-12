/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef } from 'react';
import type {
  Root,
  Trigger,
  Value,
  Content,
  Item,
  Group,
  Label,
  Separator,
} from '@radix-ui/react-select';
import type { VariantProps } from 'class-variance-authority';
import type { selectTriggerVariants, selectItemVariants } from './select.variants.js';

export type SelectProps = ComponentPropsWithoutRef<typeof Root>;

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

export type SelectValueProps = ComponentPropsWithoutRef<typeof Value>;

export type SelectContentProps = ComponentPropsWithoutRef<typeof Content>;

export interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof Item>,
    VariantProps<typeof selectItemVariants> {}

export type SelectGroupProps = ComponentPropsWithoutRef<typeof Group>;
export type SelectLabelProps = ComponentPropsWithoutRef<typeof Label>;
export type SelectSeparatorProps = ComponentPropsWithoutRef<typeof Separator>;
