/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import * as React from 'react';

type Tone = 'progress' | 'pending' | 'done' | 'blocked' | 'idle' | 'info';

const label: Record<Tone, string> = {
  progress: '进行中',
  pending: '待处理',
  done: '已完成',
  blocked: '受阻',
  idle: '空闲',
  info: '提示',
};

export interface TagProps {
  tone?: Tone;
  dot?: boolean;
  children?: React.ReactNode;
}

export default function Tag({ tone = 'idle', dot = true, children }: TagProps) {
  return (
    <span className={`tp-tag tp-status-${tone}`}>
      {dot && <span className="size-1.5 rounded-pill bg-current" />}
      {children ?? label[tone]}
    </span>
  );
}

/* Usage:
 *   <Tag tone="done" />
 *   <Tag tone="progress">运行中 · step 3/5</Tag>
 */
