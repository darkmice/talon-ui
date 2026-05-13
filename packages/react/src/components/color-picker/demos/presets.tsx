/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { ColorPicker } from '@talon-ui/react';
import { TalonTokens } from '@talon-ui/tokens';

const brand = [
  TalonTokens.color.primary['500'].value,
  TalonTokens.color.primary['600'].value,
  TalonTokens.color.primary['700'].value,
  TalonTokens.color.primary['800'].value,
];

const status = [
  TalonTokens.color.status.progress.fg.value,
  TalonTokens.color.status.pending.fg.value,
  TalonTokens.color.status.done.fg.value,
  TalonTokens.color.status.blocked.fg.value,
  TalonTokens.color.status.idle.fg.value,
  TalonTokens.color.status.info.fg.value,
];

const DEFAULT_STATUS = TalonTokens.color.status.done.fg.value;

export default function Demo() {
  const [v, setV] = useState(DEFAULT_STATUS);
  return (
    <div className="max-w-xs">
      <ColorPicker value={v} onValueChange={setV} presets={[...brand, ...status]} />
    </div>
  );
}
