/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { TimePicker, Text } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState<string>();
  return (
    <div className="space-y-tp-2 max-w-xs">
      <TimePicker value={v} onValueChange={setV} />
      <Text variant="caption" tone="secondary">{v || 'No time selected'}</Text>
    </div>
  );
}
