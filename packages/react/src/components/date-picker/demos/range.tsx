/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { DatePicker, Text } from '@talon-ui/react';
import type { DateRange } from 'react-day-picker';

export default function Demo() {
  const [v, setV] = useState<DateRange | undefined>();
  return (
    <div className="space-y-tp-2 max-w-xs">
      <DatePicker mode="range" value={v} onValueChange={setV} placeholder="Pick a range" />
      <Text variant="caption" tone="secondary">
        {v?.from
          ? `${v.from.toDateString()} – ${v.to ? v.to.toDateString() : 'pending'}`
          : 'No range selected'}
      </Text>
    </div>
  );
}
