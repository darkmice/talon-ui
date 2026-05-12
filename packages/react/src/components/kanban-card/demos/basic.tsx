/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { KanbanCard } from '@talon-ui/react';

export default function Demo() {
  return (
    <KanbanCard
      id="TALON-12"
      title="Wire up @talon-ui/react release pipeline"
      description="Configure Changesets and the GitHub release workflow to publish on tag."
      tags={[{ label: 'release', tone: 'info' }, { label: 'infra' }]}
      timestamp="Updated 2h ago"
    />
  );
}
