/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { toastRootVariants, toastIconVariants } from './toast.variants.js';
import { ToastContext } from './toast-context.js';
import type { ToastItem, ToastTone } from './toast-context.js';

const DEFAULT_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
} as const;

const DEFAULT_DURATION: Record<ToastTone, number> = {
  info: 4000,
  success: 4000,
  warning: 6000,
  error: 8000,
};

let __id = 0;
const nextId = () => `toast-${Date.now()}-${++__id}`;

export function ToastProvider({
  children,
  max = 3,
}: {
  children: ReactNode;
  max?: number;
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(
    (item: Omit<ToastItem, 'id'> & { id?: string }) => {
      const id = item.id ?? nextId();
      setToasts((current) => {
        const next = [...current, { ...item, id }];
        // Truncate from the front so newest stays visible
        return next.slice(-max);
      });
      return id;
    },
    [max],
  );

  const dismiss = useCallback((id?: string) => {
    setToasts((current) =>
      id ? current.filter((t) => t.id !== id) : [],
    );
  }, []);

  const ctxValue = useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss],
  );

  return (
    <ToastContext.Provider value={ctxValue}>
      <RadixToast.Provider duration={4000} swipeDirection="right">
        {children}
        {toasts.map((t) => {
          const Icon = DEFAULT_ICONS[t.tone ?? 'info'];
          const duration = t.duration ?? DEFAULT_DURATION[t.tone ?? 'info'];
          return (
            <RadixToast.Root
              key={t.id}
              duration={duration}
              onOpenChange={(open) => {
                if (!open) dismiss(t.id);
              }}
              className={cn(toastRootVariants({ tone: t.tone }))}
            >
              <span
                aria-hidden
                className={cn(
                  toastIconVariants({ tone: t.tone }),
                  'shrink-0 size-5 inline-flex items-center justify-center',
                )}
              >
                <Icon className="size-5" />
              </span>
              <div className="flex-1 min-w-0">
                {t.title && (
                  <RadixToast.Title className="text-body-strong text-text-primary">
                    {t.title}
                  </RadixToast.Title>
                )}
                {t.description && (
                  <RadixToast.Description className="mt-tp-1 text-caption text-text-secondary">
                    {t.description}
                  </RadixToast.Description>
                )}
              </div>
              {t.action && <div className="shrink-0">{t.action}</div>}
              <RadixToast.Close
                aria-label="Close"
                className="shrink-0 inline-flex items-center justify-center size-6 rounded-sm text-text-tertiary hover:text-text-primary hover:bg-bg-subtle focus-visible:tp-focus-ring focus-visible:outline-none"
              >
                <X className="size-4" aria-hidden />
              </RadixToast.Close>
            </RadixToast.Root>
          );
        })}
        <RadixToast.Viewport className="fixed top-4 right-4 z-[100] flex flex-col gap-tp-2 w-[360px] max-w-[100vw] outline-none" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}

// Also export the Radix-style composition for advanced users:
export const ToastRoot = RadixToast.Root;
export const ToastTitle = RadixToast.Title;
export const ToastDescription = RadixToast.Description;
export const ToastClose = RadixToast.Close;
export const ToastAction = RadixToast.Action;
export const ToastViewport = RadixToast.Viewport;
