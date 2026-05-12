/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import {
  stepperRootVariants,
  stepperIndicatorVariants,
  stepperConnectorVariants,
  stepperTitleVariants,
} from './stepper.variants.js';
import type { StepperProps, StepperStep, StepperStatus } from './stepper.types.js';

function resolveStatus(step: StepperStep, index: number, current: number): StepperStatus {
  if (step.status) return step.status;
  if (index < current) return 'complete';
  if (index === current) return 'current';
  return 'idle';
}

export const Stepper = forwardRef<HTMLOListElement, StepperProps>(function Stepper(
  { steps, current, orientation = 'horizontal', size = 'md', className, onStepClick, ...rest },
  ref,
) {
  return (
    <ol
      ref={ref}
      role="list"
      aria-label="Steps"
      data-orientation={orientation}
      className={cn(stepperRootVariants({ orientation }), className)}
      {...rest}
    >
      {steps.map((step, i) => {
        const status = resolveStatus(step, i, current);
        const isLast = i === steps.length - 1;

        const indicatorContent = step.icon ? (
          step.icon
        ) : status === 'complete' ? (
          <Check className="size-4" strokeWidth={2.5} aria-hidden />
        ) : status === 'error' ? (
          <X className="size-4" strokeWidth={2.5} aria-hidden />
        ) : (
          <span className="text-caption tp-nums">{i + 1}</span>
        );

        return (
          <li
            key={i}
            aria-current={status === 'current' ? 'step' : undefined}
            data-status={status}
            className={cn(
              'flex',
              orientation === 'horizontal' ? 'flex-1 items-center' : 'items-start',
            )}
          >
            <div
              className={cn(
                'flex items-center gap-tp-3',
                orientation === 'vertical' && 'flex-col items-start gap-tp-1',
              )}
            >
              <div className="flex items-center gap-tp-3">
                {onStepClick ? (
                  <button
                    type="button"
                    onClick={() => onStepClick(i)}
                    aria-label={`Go to step ${i + 1}`}
                    className={cn(stepperIndicatorVariants({ status, size, clickable: true }))}
                  >
                    {indicatorContent}
                  </button>
                ) : (
                  <div className={cn(stepperIndicatorVariants({ status, size, clickable: false }))}>
                    {indicatorContent}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className={cn(stepperTitleVariants({ status }))}>{step.title}</span>
                  {step.description && (
                    <span className="text-caption text-text-tertiary">{step.description}</span>
                  )}
                </div>
              </div>
            </div>
            {!isLast && (
              <span
                aria-hidden
                className={cn(stepperConnectorVariants({ status, orientation }))}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
});

Stepper.displayName = 'Stepper';
