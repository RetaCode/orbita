'use client';
import { MainTaskCard } from "./MainTaskCard"; // Importación nombrada

export function GroupTaskList({ group }: { group: any }) {
  return (
    <div className="space-y-6">
      {group.mainTasks.map((mainTask: any) => (
        <MainTaskCard key={mainTask.id} mainTask={mainTask} members={group.members} />
      ))}
    </div>
  );
}