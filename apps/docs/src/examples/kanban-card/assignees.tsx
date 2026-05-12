/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { KanbanCard, Space } from '@talon-ui/react';

const team = [
  { id: '1', name: 'Ada Lovelace', fallback: 'AL' },
  { id: '2', name: 'Brian Kernighan', fallback: 'BK' },
  { id: '3', name: 'Carmen Sandiego', fallback: 'CS' },
  { id: '4', name: 'Dorothy Vaughan', fallback: 'DV' },
  { id: '5', name: 'Edsger Dijkstra', fallback: 'ED' },
];

export default function Demo() {
  const [selected, setSelected] = useState(false);
  return (
    <Space size="md">
      <KanbanCard
        id="TALON-77"
        title="Triage incoming bugs"
        tags={[{ label: 'pending', tone: 'pending' }]}
        assignees={team}
        progress={20}
        timestamp="Created today"
        selected={selected}
        onSelect={() => setSelected((v) => !v)}
      />
    </Space>
  );
}
