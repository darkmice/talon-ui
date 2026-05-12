/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Card } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="space-y-tp-3">
      <Card padding="sm">Small padding (12)</Card>
      <Card padding="md">Medium padding (20, default)</Card>
      <Card padding="lg">Large padding (24)</Card>
    </div>
  );
}
