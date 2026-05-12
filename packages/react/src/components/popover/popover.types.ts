/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef } from 'react';
import type { Content, Close, Arrow } from '@radix-ui/react-popover';
import type { VariantProps } from 'class-variance-authority';
import type { popoverContentVariants } from './popover.variants.js';

export interface PopoverContentProps
  extends ComponentPropsWithoutRef<typeof Content>,
    VariantProps<typeof popoverContentVariants> {}

export type PopoverCloseProps = ComponentPropsWithoutRef<typeof Close>;
export type PopoverArrowProps = ComponentPropsWithoutRef<typeof Arrow>;
