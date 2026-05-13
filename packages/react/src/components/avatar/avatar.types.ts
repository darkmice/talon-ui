/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { Root } from '@radix-ui/react-avatar';
import type { VariantProps } from 'class-variance-authority';
import type { avatarVariants } from './avatar.variants.js';

export type AvatarStatus = 'online' | 'away' | 'offline';

export interface AvatarProps
  extends Omit<ComponentPropsWithoutRef<typeof Root>, 'children'>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  status?: AvatarStatus;
}

export interface AvatarGroupProps {
  max?: number;
  size?: AvatarProps['size'];
  ring?: AvatarProps['ring'];
  className?: string;
  children: ReactNode;
}
