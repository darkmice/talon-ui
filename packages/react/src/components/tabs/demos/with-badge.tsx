/*
 * Copyright (c) 2026 Talon Contributors
 * Author: dark.lijin@gmail.com
 * Licensed under the MIT License.
 */

import { Tabs, TabsList, TabsTrigger, TabsContent, Badge, Text } from '@talon-ui/react';

export default function Demo() {
  return (
    <Tabs defaultValue="inbox">
      <TabsList>
        <TabsTrigger value="inbox">Inbox <Badge count={4} className="ml-tp-2" /></TabsTrigger>
        <TabsTrigger value="archive">Archive</TabsTrigger>
        <TabsTrigger value="trash">Trash <Badge count={120} className="ml-tp-2" tone="neutral" /></TabsTrigger>
      </TabsList>
      <TabsContent value="inbox"><Text>4 unread messages.</Text></TabsContent>
      <TabsContent value="archive"><Text>Archived items.</Text></TabsContent>
      <TabsContent value="trash"><Text>120 trashed items.</Text></TabsContent>
    </Tabs>
  );
}
