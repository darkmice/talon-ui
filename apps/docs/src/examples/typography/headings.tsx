/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Title } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="space-y-tp-3">
      <Title level="display">Display heading</Title>
      <Title level={1}>Section title (h1)</Title>
      <Title level={2}>Subsection (h2)</Title>
      <Title level={3}>Block heading (h3)</Title>
    </div>
  );
}
