/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import { cn } from '../../primitives/cn.js';
import { Card } from '../card/card.js';
import { Tag } from '../tag/tag.js';
import { Avatar } from '../avatar/avatar.js';
import { AvatarGroup } from '../avatar/avatar-group.js';
import { Progress } from '../progress/progress.js';
import { kanbanCardVariants } from './kanban-card.variants.js';
import type { KanbanCardProps } from './kanban-card.types.js';

export const KanbanCard = forwardRef<HTMLDivElement, KanbanCardProps>(function KanbanCard(
  { className, id, title, description, tags, assignees, progress, timestamp, onSelect, selected, size, ...rest },
  ref,
) {
  return (
    <Card
      ref={ref}
      padding="sm"
      hoverable={!!onSelect}
      interactive={!!onSelect}
      onClick={onSelect}
      aria-pressed={onSelect ? !!selected : undefined}
      data-selected={selected || undefined}
      className={cn(kanbanCardVariants({ size, selected }), className)}
      {...rest}
    >
      {id && <p className="text-caption text-text-tertiary font-mono">{id}</p>}
      <p className="text-body-strong text-text-primary mt-tp-1">{title}</p>
      {description && <p className="text-caption text-text-secondary mt-tp-1 line-clamp-2">{description}</p>}
      {tags && tags.length > 0 && (
        <div className="mt-tp-2 flex flex-wrap items-center gap-tp-1">
          {tags.map((t, i) => (
            <Tag key={i} tone={t.tone} size="sm">{t.label}</Tag>
          ))}
        </div>
      )}
      {(assignees?.length || typeof progress === 'number') && (
        <div className="mt-tp-3 flex items-center justify-between gap-tp-2">
          {assignees && assignees.length > 0 ? (
            <AvatarGroup max={3} size="sm">
              {assignees.map((a) => (
                <Avatar key={a.id} src={a.src} alt={a.name} fallback={a.fallback ?? a.name.slice(0, 2)} />
              ))}
            </AvatarGroup>
          ) : <span />}
          {typeof progress === 'number' && (
            <div className="flex-1 max-w-[80px]">
              <Progress value={progress} size="sm" showInfo={false} />
            </div>
          )}
        </div>
      )}
      {timestamp && <p className="mt-tp-2 text-caption text-text-tertiary">{timestamp}</p>}
    </Card>
  );
});

KanbanCard.displayName = 'KanbanCard';
