/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Collapse, CollapsePanel, CollapseHeader, CollapseContent, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <Collapse type="single" collapsible>
      <CollapsePanel value="inbox">
        <CollapseHeader extra="12">Inbox</CollapseHeader>
        <CollapseContent><Text>12 unread messages.</Text></CollapseContent>
      </CollapsePanel>
      <CollapsePanel value="archive">
        <CollapseHeader extra="2 048">Archive</CollapseHeader>
        <CollapseContent><Text>Archived items.</Text></CollapseContent>
      </CollapsePanel>
    </Collapse>
  );
}
