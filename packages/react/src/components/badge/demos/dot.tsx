/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Badge } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="flex items-center gap-tp-6">
      <Badge dot>
        <span className="size-9 rounded-md bg-bg-subtle inline-flex items-center justify-center text-text-secondary text-caption">
          bell
        </span>
      </Badge>
      <Badge dot tone="success">
        <span className="size-9 rounded-md bg-bg-subtle inline-flex items-center justify-center text-text-secondary text-caption">
          on
        </span>
      </Badge>
    </div>
  );
}
