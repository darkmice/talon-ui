/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { ColorPicker } from '@talon-ui/react';

const brand = ['#4F60FF', '#3B4DE6', '#2E3DBF', '#1E2A8C'];
const status = ['#2E5BFF', '#B26B00', '#0E8A55', '#C8322B', '#64748B', '#1F6FEB'];

export default function Demo() {
  const [v, setV] = useState('#0E8A55');
  return (
    <div className="max-w-xs">
      <ColorPicker value={v} onValueChange={setV} presets={[...brand, ...status]} />
    </div>
  );
}
