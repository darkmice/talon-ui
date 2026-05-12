/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { TimePicker, Text } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState('09:30:00');
  return (
    <div className="space-y-tp-2 max-w-xs">
      <TimePicker value={v} onValueChange={setV} withSeconds minuteStep={5} secondStep={15} />
      <Text variant="caption" tone="secondary">{v}</Text>
    </div>
  );
}
