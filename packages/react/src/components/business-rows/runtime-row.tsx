/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { Cpu } from 'lucide-react';
import { cn } from '../../primitives/cn.js';
import { Tag } from '../tag/tag.js';
import { Progress } from '../progress/progress.js';

export interface RuntimeRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  name: string;
  status: 'online' | 'idle' | 'offline';
  engine?: string;
  leases?: number;
  cpu?: number;    // 0..100
  memory?: number; // 0..100
  icon?: ReactNode;
}

const STATUS_LABEL: Record<RuntimeRowProps['status'], string> = {
  online: 'Online',
  idle: 'Idle',
  offline: 'Offline',
};

const STATUS_TONE: Record<RuntimeRowProps['status'], 'done' | 'idle' | 'blocked'> = {
  online: 'done',
  idle: 'idle',
  offline: 'blocked',
};

export const RuntimeRow = forwardRef<HTMLDivElement, RuntimeRowProps>(function RuntimeRow(
  { name, status, engine, leases, cpu, memory, icon, className, ...rest },
  ref,
) {
  const isOffline = status === 'offline';
  return (
    <div
      ref={ref}
      data-status={status}
      className={cn(
        'flex items-center gap-tp-3 h-14 px-tp-3',
        isOffline && 'opacity-70',
        className,
      )}
      {...rest}
    >
      <span className="size-8 inline-flex items-center justify-center rounded-sm bg-bg-subtle text-text-secondary shrink-0">
        {icon ?? <Cpu className="size-5" aria-hidden />}
      </span>
      <div className="flex-1 min-w-0 flex items-center gap-tp-2">
        <span className="text-body-strong text-text-primary truncate">{name}</span>
        <Tag size="sm" tone={STATUS_TONE[status]} dot>
          {STATUS_LABEL[status]}
        </Tag>
        {engine && (
          <Tag size="sm" tone="neutral">
            {engine}
          </Tag>
        )}
      </div>
      <div className="flex items-center gap-tp-3 shrink-0">
        {typeof leases === 'number' && (
          <span className="text-caption text-text-secondary tp-nums">{leases} leases</span>
        )}
        <div className="w-[60px] space-y-tp-1">
          <Progress
            value={isOffline ? 0 : cpu ?? 0}
            size="sm"
            showInfo={false}
            status={isOffline ? 'normal' : (cpu ?? 0) > 80 ? 'warning' : 'normal'}
          />
          <Progress
            value={isOffline ? 0 : memory ?? 0}
            size="sm"
            showInfo={false}
            status={isOffline ? 'normal' : (memory ?? 0) > 80 ? 'warning' : 'normal'}
          />
        </div>
        <div className="w-12 text-caption text-text-tertiary tp-nums">
          <div>CPU {isOffline ? '–' : `${cpu ?? 0}%`}</div>
          <div>MEM {isOffline ? '–' : `${memory ?? 0}%`}</div>
        </div>
      </div>
    </div>
  );
});

RuntimeRow.displayName = 'RuntimeRow';
