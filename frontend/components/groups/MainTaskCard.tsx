'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SubTaskItem } from "./SubTaskItem"; // Importación nombrada

export function MainTaskCard({ mainTask, members }: { mainTask: any, members: any[] }) {
  const completedCount = mainTask.subTasks.filter((st: any) => st.isCompleted).length;
  const progress = mainTask.subTasks.length > 0 ? (completedCount / mainTask.subTasks.length) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mainTask.title}</CardTitle>
        <CardDescription>{completedCount} de {mainTask.subTasks.length} subtareas completadas</CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {mainTask.subTasks.map((subTask: any) => {
            const assignee = members.find(m => m.id === subTask.assignedTo);
            return (
              <SubTaskItem key={subTask.id} subTask={subTask} assignee={assignee} />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};