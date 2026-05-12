/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { NumberInput, Space } from '@talon-ui/react';

export default function Demo() {
  const [px, setPx] = useState(16);
  const [pct, setPct] = useState(50);
  return (
    <Space direction="vertical" size="sm">
      <NumberInput value={px} onValueChange={setPx} unit="px" min={0} max={64} step={1} />
      <NumberInput value={pct} onValueChange={setPct} unit="%" min={0} max={100} step={0.5} precision={1} />
    </Space>
  );
}
