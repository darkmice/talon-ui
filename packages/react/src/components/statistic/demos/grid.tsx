/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Statistic } from '@talon-ui/react';

export default function Demo() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-tp-6">
      <Statistic label="Total runs" value={4280} />
      <Statistic label="Success rate" value={98.7} precision={1} suffix="%" />
      <Statistic label="Avg latency" value={142} suffix="ms" />
      <Statistic label="Open issues" value={37} delta={4} />
    </div>
  );
}
