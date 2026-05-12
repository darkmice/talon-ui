/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Collapse, CollapsePanel, CollapseHeader, CollapseContent, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <Collapse type="multiple" defaultValue={['a', 'c']}>
      <CollapsePanel value="a">
        <CollapseHeader>Section A</CollapseHeader>
        <CollapseContent><Text>Content A.</Text></CollapseContent>
      </CollapsePanel>
      <CollapsePanel value="b">
        <CollapseHeader>Section B</CollapseHeader>
        <CollapseContent><Text>Content B.</Text></CollapseContent>
      </CollapsePanel>
      <CollapsePanel value="c">
        <CollapseHeader>Section C</CollapseHeader>
        <CollapseContent><Text>Content C.</Text></CollapseContent>
      </CollapsePanel>
    </Collapse>
  );
}
