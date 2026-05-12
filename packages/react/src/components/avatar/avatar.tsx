/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';
import { cn } from '../../primitives/cn.js';
import { avatarVariants, avatarStatusVariants } from './avatar.variants.js';
import type { AvatarProps } from './avatar.types.js';

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, size, ring, src, alt, fallback, status, ...rest },
  ref,
) {
  return (
    <RadixAvatar.Root
      ref={ref}
      data-size={size ?? 'md'}
      data-status={status}
      className={cn(avatarVariants({ size, ring }), className)}
      {...rest}
    >
      {src && (
        <RadixAvatar.Image
          src={src}
          alt={alt ?? ''}
          className="size-full rounded-pill object-cover"
        />
      )}
      <RadixAvatar.Fallback
        delayMs={src ? 600 : 0}
        className="size-full inline-flex items-center justify-center rounded-pill"
      >
        {fallback}
      </RadixAvatar.Fallback>
      {status && (
        <span
          aria-label={status}
          className={avatarStatusVariants({ status })}
        />
      )}
    </RadixAvatar.Root>
  );
});

Avatar.displayName = 'Avatar';
