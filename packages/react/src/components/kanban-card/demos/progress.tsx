/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { KanbanCard } from '@talon-ui/react';

export default function Demo() {
  return (
    <KanbanCard
      id="TALON-45"
      title="Block 4 — data display components"
      description="Skeleton, Spin, Empty, Result, Statistic, Progress, Descriptions, Collapse, KanbanCard, BusinessRows."
      tags={[{ label: 'in progress', tone: 'progress' }]}
      progress={70}
      timestamp="Due Sun"
    />
  );
}
