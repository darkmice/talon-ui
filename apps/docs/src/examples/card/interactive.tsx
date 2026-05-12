/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Card } from '@talon-ui/react';

export default function Demo() {
  return (
    <Card hoverable interactive onClick={() => alert('Card clicked')}>
      <p className="text-body-strong">Click or focus me</p>
      <p className="text-caption text-text-secondary">Hover → indigo border + pop shadow; focus → focus ring.</p>
    </Card>
  );
}
