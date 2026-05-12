/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Divider } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="space-y-tp-3">
      <p className="text-body">Above the fold.</p>
      <Divider>Section break</Divider>
      <p className="text-body">Below the fold.</p>
    </div>
  );
}
