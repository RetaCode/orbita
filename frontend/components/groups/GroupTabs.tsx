// frontend/components/groups/GroupTabs.tsx
'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupTaskList } from "./GroupTaskList";
import { GroupMembersList } from "./GroupMembersList";
import { GroupSettings } from "./GroupSettings"; // 1. Importamos la configuración
import type { GroupDetailData } from "@/lib/mock-data";

export function GroupTabs({ group }: { group: GroupDetailData }) {
  return (
    <Tabs defaultValue="tasks">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tasks">Tareas</TabsTrigger>
        <TabsTrigger value="members">Miembros</TabsTrigger>
        <TabsTrigger value="settings">Configuración</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tasks" className="mt-4">
        <GroupTaskList group={group} />
      </TabsContent>
      
      <TabsContent value="members" className="mt-4">
        <GroupMembersList group={group} />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-4">
        {/* 2. Aquí renderizamos la configuración del grupo */}
        <GroupSettings group={group} />
      </TabsContent>
    </Tabs>
  );
}