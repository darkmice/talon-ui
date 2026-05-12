/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Badge } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="flex items-center gap-tp-4">
      <Badge count={5}>
        <span className="size-9 rounded-md bg-bg-subtle inline-flex items-center justify-center text-text-secondary text-caption">A</span>
      </Badge>
      <Badge count={42}>
        <span className="size-9 rounded-md bg-bg-subtle inline-flex items-center justify-center text-text-secondary text-caption">B</span>
      </Badge>
      <Badge count={120}>
        <span className="size-9 rounded-md bg-bg-subtle inline-flex items-center justify-center text-text-secondary text-caption">C</span>
      </Badge>
      <Badge count={1500} max={999}>
        <span className="size-9 rounded-md bg-bg-subtle inline-flex items-center justify-center text-text-secondary text-caption">D</span>
      </Badge>
    </div>
  );
}
