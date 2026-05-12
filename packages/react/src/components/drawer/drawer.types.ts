/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ComponentPropsWithoutRef } from 'react';
import type { Content } from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import type { drawerContentVariants } from './drawer.variants.js';

export interface DrawerContentProps
  extends ComponentPropsWithoutRef<typeof Content>,
    VariantProps<typeof drawerContentVariants> {
  showClose?: boolean;
}
