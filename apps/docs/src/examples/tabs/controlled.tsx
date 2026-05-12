/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, Button, Space, Text } from '@talon-ui/react';

export default function Demo() {
  const [tab, setTab] = useState('a');
  return (
    <Space direction="vertical" size="sm">
      <Space size="sm">
        <Button size="sm" onClick={() => setTab('a')}>Goto A</Button>
        <Button size="sm" onClick={() => setTab('b')}>Goto B</Button>
        <Button size="sm" onClick={() => setTab('c')}>Goto C</Button>
      </Space>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
          <TabsTrigger value="c">C</TabsTrigger>
        </TabsList>
        <TabsContent value="a"><Text>Panel A</Text></TabsContent>
        <TabsContent value="b"><Text>Panel B</Text></TabsContent>
        <TabsContent value="c"><Text>Panel C</Text></TabsContent>
      </Tabs>
    </Space>
  );
}
