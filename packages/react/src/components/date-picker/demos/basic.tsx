/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { DatePicker, Text } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState<Date>();
  return (
    <div className="space-y-tp-2 max-w-xs">
      <DatePicker value={v} onValueChange={setV} placeholder="Pick a date" />
      <Text variant="caption" tone="secondary">
        {v ? v.toISOString().slice(0, 10) : 'No date selected'}
      </Text>
    </div>
  );
}
