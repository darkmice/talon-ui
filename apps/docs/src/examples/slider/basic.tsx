/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Slider, Text } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState([42]);
  return (
    <div className="space-y-tp-2">
      <Slider value={v} onValueChange={setV} min={0} max={100} step={1} />
      <Text variant="caption" tone="secondary">Current: {v[0]}</Text>
    </div>
  );
}
