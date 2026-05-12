/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { drawerContentVariants, drawerOverlayClass } from './drawer.variants.js';
import type { DrawerContentProps } from './drawer.types.js';

export const Drawer = RadixDialog.Root;
export const DrawerTrigger = RadixDialog.Trigger;
export const DrawerPortal = RadixDialog.Portal;
export const DrawerClose = RadixDialog.Close;

export const DrawerOverlay = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DrawerOverlay({ className, ...rest }, ref) {
    return <RadixDialog.Overlay ref={ref} className={cn(drawerOverlayClass, className)} {...rest} />;
  },
);
DrawerOverlay.displayName = 'DrawerOverlay';

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent({ className, side, size, showClose = true, children, ...rest }, ref) {
    return (
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={drawerOverlayClass} />
        <RadixDialog.Content
          ref={ref}
          className={cn(drawerContentVariants({ side, size }), className)}
          {...rest}
        >
          {children}
          {showClose && (
            <RadixDialog.Close
              aria-label="Close"
              className={cn(
                'absolute top-tp-4 right-tp-4 inline-flex items-center justify-center size-7 rounded-sm',
                'text-text-tertiary hover:text-text-primary hover:bg-bg-subtle',
                'focus-visible:tp-focus-ring focus-visible:outline-none',
              )}
            >
              <X className="size-4" aria-hidden />
            </RadixDialog.Close>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  },
);
DrawerContent.displayName = 'DrawerContent';

export const DrawerHeader = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-tp-5 border-b border-border', className)} {...rest} />
);

export const DrawerBody = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 overflow-y-auto p-tp-5', className)} {...rest} />
);

export const DrawerFooter = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-tp-5 border-t border-border flex justify-end gap-tp-2', className)} {...rest} />
);

export const DrawerTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  function DrawerTitle({ className, ...rest }, ref) {
    return (
      <RadixDialog.Title ref={ref} className={cn('text-h2 text-text-primary', className)} {...rest} />
    );
  },
);
DrawerTitle.displayName = 'DrawerTitle';

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function DrawerDescription({ className, ...rest }, ref) {
  return (
    <RadixDialog.Description
      ref={ref}
      className={cn('text-body text-text-secondary mt-tp-1', className)}
      {...rest}
    />
  );
});
DrawerDescription.displayName = 'DrawerDescription';
