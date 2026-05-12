/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Tag } from '@talon-ui/react';

const tones = ['neutral', 'progress', 'pending', 'done', 'blocked', 'idle', 'info'] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-tp-2">
      {tones.map((t) => (
        <Tag key={t} tone={t} dot={t !== 'neutral'}>
          {t}
        </Tag>
      ))}
    </div>
  );
}
