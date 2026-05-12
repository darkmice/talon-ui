/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import type { HTMLAttributes, ReactNode } from 'react';

type KanbanTagTone = 'neutral' | 'progress' | 'pending' | 'done' | 'blocked' | 'idle' | 'info';

export interface KanbanAssignee {
  id: string;
  name: string;
  src?: string;
  fallback?: string;
}

export interface KanbanCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  tags?: Array<{ label: string; tone?: KanbanTagTone }>;
  assignees?: KanbanAssignee[];
  progress?: number;
  timestamp?: ReactNode;
  onSelect?: () => void;
  selected?: boolean;
  size?: 'sm' | 'md';
}
