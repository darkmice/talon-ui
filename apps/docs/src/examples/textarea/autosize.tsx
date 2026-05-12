/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Textarea } from '@talon-ui/react';

export default function Demo() {
  const [v, setV] = useState('Type a longer message and watch the height adjust automatically.');
  return <Textarea autosize value={v} onChange={(e) => setV(e.target.value)} />;
}
