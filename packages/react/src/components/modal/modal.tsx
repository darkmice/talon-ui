/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { modalContentVariants, modalOverlayClass } from './modal.variants.js';
import type {
  ModalContentProps, ModalCloseProps,
} from './modal.types.js';

export const Modal = RadixDialog.Root;
export const ModalTrigger = RadixDialog.Trigger;
export const ModalPortal = RadixDialog.Portal;
export const ModalClose = RadixDialog.Close;

export const ModalOverlay = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function ModalOverlay(
  { className, ...rest },
  ref,
) {
  return <RadixDialog.Overlay ref={ref} className={cn(modalOverlayClass, className)} {...rest} />;
});
ModalOverlay.displayName = 'ModalOverlay';

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(function ModalContent(
  { className, size, showClose = true, children, ...rest },
  ref,
) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={modalOverlayClass} />
      <RadixDialog.Content ref={ref} className={cn(modalContentVariants({ size }), className)} {...rest}>
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
});
ModalContent.displayName = 'ModalContent';

export const ModalHeader = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-tp-1', className)} {...rest} />
);

export const ModalTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(function ModalTitle(
  { className, ...rest },
  ref,
) {
  return <RadixDialog.Title ref={ref} className={cn('text-h2 text-text-primary', className)} {...rest} />;
});
ModalTitle.displayName = 'ModalTitle';

export const ModalDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function ModalDescription(
  { className, ...rest },
  ref,
) {
  return <RadixDialog.Description ref={ref} className={cn('text-body text-text-secondary', className)} {...rest} />;
});
ModalDescription.displayName = 'ModalDescription';

export const ModalFooter = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex justify-end gap-tp-2 mt-tp-5', className)} {...rest} />
);
