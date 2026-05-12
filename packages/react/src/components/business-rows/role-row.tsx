/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { Shield } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { Avatar } from '../avatar/avatar.js';
import { AvatarGroup } from '../avatar/avatar-group.js';
import { Link } from '../typography/link.js';

export interface RoleMember {
  id: string;
  name: string;
  src?: string;
  fallback?: string;
}

export interface RoleRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  name: string;
  icon?: ReactNode;
  members?: RoleMember[];
  manageHref?: string;
  manageLabel?: string;
}

export const RoleRow = forwardRef<HTMLDivElement, RoleRowProps>(function RoleRow(
  { name, icon, members = [], manageHref, manageLabel = 'Manage members', className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('flex items-center gap-tp-3 h-10 px-tp-2', className)} {...rest}>
      <span className="size-6 inline-flex items-center justify-center rounded-sm bg-bg-subtle text-text-secondary shrink-0">
        {icon ?? <Shield className="size-4" aria-hidden />}
      </span>
      <div className="flex-1 flex items-center gap-tp-2">
        <span className="text-body-strong text-text-primary">{name}</span>
        {manageHref && (
          <Link href={manageHref} tone="primary" className="text-caption">
            {manageLabel}
          </Link>
        )}
      </div>
      <div className="flex items-center gap-tp-2">
        <span className="text-caption text-text-tertiary tp-nums">{members.length} 人</span>
        {members.length > 0 && (
          <AvatarGroup max={3} size="sm">
            {members.map((m) => (
              <Avatar
                key={m.id}
                src={m.src}
                alt={m.name}
                fallback={m.fallback ?? m.name.slice(0, 2)}
              />
            ))}
          </AvatarGroup>
        )}
      </div>
    </div>
  );
});

RoleRow.displayName = 'RoleRow';
