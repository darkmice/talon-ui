/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { FileIcon } from 'lucide-react';
import { cn } from '../../primitives/cn.js';

export interface FileRefRowProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  path: string;
  timestamp?: ReactNode;
  icon?: ReactNode;
  href?: string;
}

export const FileRefRow = forwardRef<HTMLElement, FileRefRowProps>(function FileRefRow(
  { path, timestamp, icon, href, className, ...rest },
  ref,
) {
  const cls = cn(
    'flex items-center gap-tp-2 h-8 px-tp-2 rounded-sm hover:bg-bg-subtle',
    className,
  );

  const inner = (
    <>
      <span className="size-4 inline-flex items-center justify-center text-text-tertiary shrink-0">
        {icon ?? <FileIcon className="size-4" aria-hidden />}
      </span>
      <span className="flex-1 min-w-0 font-mono text-mono-sm tp-nums text-text-primary truncate">
        {path}
      </span>
      {timestamp && (
        <span className="text-caption text-text-tertiary tp-nums shrink-0">{timestamp}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} {...(rest as HTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  }

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={cls} {...(rest as HTMLAttributes<HTMLDivElement>)}>
      {inner}
    </div>
  );
});

FileRefRow.displayName = 'FileRefRow';
