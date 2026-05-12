/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { createContext } from 'react';
import type { ReactNode } from 'react';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  action?: ReactNode;
  duration?: number;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  toast: (item: Omit<ToastItem, 'id'> & { id?: string }) => string;
  dismiss: (id?: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
