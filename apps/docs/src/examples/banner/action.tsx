/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Banner, Button } from '@talon-ui/react';

export default function Demo() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <Banner
      tone="warning"
      title="Action required"
      action={<Button size="sm" variant="secondary">Review</Button>}
      onDismiss={() => setOpen(false)}
    >
      One project is missing a billing method.
    </Banner>
  );
}
