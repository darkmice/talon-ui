/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef, Children, isValidElement } from 'react';
import { cn } from '../../primitives/cn.js';
import {
  descriptionsRowClass,
  descriptionsLabelClass,
  descriptionsValueClass,
} from './descriptions.variants.js';
import type { DescriptionsProps, DescriptionsItemProps } from './descriptions.types.js';

export const DescriptionsItem = (_props: DescriptionsItemProps) => null;
DescriptionsItem.displayName = 'DescriptionsItem';

export const Descriptions = forwardRef<HTMLDListElement, DescriptionsProps>(function Descriptions(
  { className, columns = 1, size = 'md', layout = 'horizontal', children, ...rest },
  ref,
) {
  const items = Children.toArray(children).filter(isValidElement) as React.ReactElement<DescriptionsItemProps>[];
  return (
    <dl
      ref={ref}
      data-columns={columns}
      data-size={size}
      data-layout={layout}
      className={cn('grid', 'gap-x-tp-6 gap-y-tp-2', className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      {...rest}
    >
      {items.map((item, i) => {
        const span = item.props.span ?? 1;
        if (layout === 'vertical') {
          return (
            <div
              key={i}
              className={cn(descriptionsRowClass({ size }), 'flex flex-col')}
              style={{
                gridColumn: `span ${Math.min(span, columns)} / span ${Math.min(span, columns)}`,
              }}
            >
              <dt className={cn(descriptionsLabelClass)}>{item.props.label}</dt>
              <dd className={cn(descriptionsValueClass({ mono: item.props.mono ?? false }))}>
                {item.props.children}
              </dd>
            </div>
          );
        }
        return (
          <div
            key={i}
            className={cn(descriptionsRowClass({ size }), 'flex items-baseline gap-tp-3')}
            style={{
              gridColumn: `span ${Math.min(span, columns)} / span ${Math.min(span, columns)}`,
            }}
          >
            <dt className={cn(descriptionsLabelClass, 'shrink-0 min-w-[120px]')}>
              {item.props.label}
            </dt>
            <dd
              className={cn(descriptionsValueClass({ mono: item.props.mono ?? false }), 'flex-1')}
            >
              {item.props.children}
            </dd>
          </div>
        );
      })}
    </dl>
  );
});

Descriptions.displayName = 'Descriptions';
