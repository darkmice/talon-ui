/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Collapse, CollapsePanel, CollapseHeader, CollapseContent, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <Collapse type="single" defaultValue="a" collapsible>
      <CollapsePanel value="a">
        <CollapseHeader>What is Talon UI?</CollapseHeader>
        <CollapseContent><Text>A React component library for the Talon Pilot design system.</Text></CollapseContent>
      </CollapsePanel>
      <CollapsePanel value="b">
        <CollapseHeader>How do I install?</CollapseHeader>
        <CollapseContent><Text>pnpm add @talon-ui/react @talon-ui/tokens, then import the styles.</Text></CollapseContent>
      </CollapsePanel>
      <CollapsePanel value="c">
        <CollapseHeader>Where are the tokens?</CollapseHeader>
        <CollapseContent><Text>packages/tokens/src/ in the monorepo.</Text></CollapseContent>
      </CollapsePanel>
    </Collapse>
  );
}
