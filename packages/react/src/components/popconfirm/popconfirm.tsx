/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef, useState } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { Button } from '../button/button.js';
import { popconfirmContentVariants, popconfirmIconVariants } from './popconfirm.variants.js';
import type { PopconfirmProps } from './popconfirm.types.js';

export const Popconfirm = forwardRef<HTMLDivElement, PopconfirmProps>(function Popconfirm(
  {
    children,
    title,
    description,
    icon,
    tone = 'default',
    okText = 'OK',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    confirming,
    side,
    align,
    open: openProp,
    defaultOpen,
    onOpenChange,
    className,
    ...rest
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultOpen ?? false);
  const ctrl = openProp !== undefined;
  const open = ctrl ? !!openProp : internal;
  const setOpen = (next: boolean) => {
    if (!ctrl) setInternal(next);
    onOpenChange?.(next);
  };

  const DefaultIcon = tone === 'danger' ? AlertTriangle : Info;
  const iconNode = icon !== undefined
    ? icon
    : <DefaultIcon className={cn(popconfirmIconVariants({ tone }), 'shrink-0 size-4 mt-[2px]')} aria-hidden />;

  const handleConfirm = async () => {
    await onConfirm?.();
    setOpen(false);
  };
  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <RadixPopover.Root open={open} onOpenChange={setOpen}>
      <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          ref={ref}
          side={side}
          align={align ?? 'center'}
          sideOffset={6}
          className={cn(popconfirmContentVariants(), className)}
          {...rest}
        >
          <div className="flex items-start gap-tp-2">
            {iconNode}
            <div className="flex-1 space-y-tp-1">
              <p className="text-body-strong text-text-primary">{title}</p>
              {description && <p className="text-caption text-text-secondary">{description}</p>}
              <div className="flex justify-end gap-tp-2 pt-tp-2">
                <Button size="sm" variant="ghost" onClick={handleCancel}>{cancelText}</Button>
                <Button
                  size="sm"
                  variant={tone === 'danger' ? 'danger' : 'primary'}
                  loading={!!confirming}
                  onClick={handleConfirm}
                >
                  {okText}
                </Button>
              </div>
            </div>
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
});

Popconfirm.displayName = 'Popconfirm';
