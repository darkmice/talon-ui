/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { cva } from 'class-variance-authority';
import { cn } from '../../primitives/cn.js';

export const collapseRootVariants = cva(
  'flex flex-col divide-y divide-border rounded-md border border-border bg-bg-surface',
);

export const collapsePanelClass = 'first:rounded-t-md last:rounded-b-md';

export const collapseHeaderClass = cn(
  'flex w-full items-center gap-tp-3 px-tp-4',
  'h-11',
  'text-body cursor-pointer',
  'hover:bg-bg-subtle',
  'focus-visible:tp-focus-ring focus-visible:outline-none rounded-sm',
);

export const collapseContentClass = cn(
  'px-tp-4 text-body text-text-secondary',
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
);
