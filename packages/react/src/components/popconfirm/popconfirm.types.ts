/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { ReactNode } from 'react';

export interface PopconfirmProps {
  children: ReactNode;            // trigger
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  tone?: 'default' | 'danger' | 'warning';
  okText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  confirming?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
}
