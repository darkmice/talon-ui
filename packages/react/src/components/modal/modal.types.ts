/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef } from 'react';
import type {
  Root, Trigger, Content, Close,
} from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import type { modalContentVariants } from './modal.variants.js';

export type ModalProps = ComponentPropsWithoutRef<typeof Root>;
export type ModalTriggerProps = ComponentPropsWithoutRef<typeof Trigger>;

export interface ModalContentProps
  extends ComponentPropsWithoutRef<typeof Content>,
    VariantProps<typeof modalContentVariants> {
  showClose?: boolean;
}

export type ModalCloseProps = ComponentPropsWithoutRef<typeof Close>;
