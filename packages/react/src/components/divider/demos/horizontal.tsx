/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Divider } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="space-y-tp-3">
      <p className="text-body">Section one content.</p>
      <Divider />
      <p className="text-body">Section two content.</p>
      <Divider tone="strong" />
      <p className="text-body">Section three (strong rule above).</p>
    </div>
  );
}
