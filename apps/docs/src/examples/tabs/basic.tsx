/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Tabs, TabsList, TabsTrigger, TabsContent, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><Text>Overview content.</Text></TabsContent>
      <TabsContent value="metrics"><Text>Metrics content.</Text></TabsContent>
      <TabsContent value="logs"><Text>Logs content.</Text></TabsContent>
    </Tabs>
  );
}
