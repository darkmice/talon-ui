/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Avatar } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="flex items-center gap-tp-3">
      <Avatar fallback="ON" status="online" />
      <Avatar fallback="AW" status="away" />
      <Avatar fallback="OF" status="offline" />
    </div>
  );
}
