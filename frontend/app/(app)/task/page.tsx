// frontend/app/(app)/tasks/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { tasksData } from '@/lib/mock-data';
import { TaskList } from '@/components/tasks/TaskList';
import { TasksToolbar } from '@/components/tasks/TasksToolbar';

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState('todos');
  const [priorityFilter, setPriorityFilter] = useState('todas');

  const filteredTasks = useMemo(() => {
    return tasksData.filter(task => {
      const statusMatch = statusFilter === 'todos' || task.estado === statusFilter;
      const priorityMatch = priorityFilter === 'todas' || task.prioridad === priorityFilter;
      return statusMatch && priorityMatch;
    });
  }, [statusFilter, priorityFilter, tasksData]);

  return (
    <div>
      <TasksToolbar 
        onStatusChange={setStatusFilter} 
        onPriorityChange={setPriorityFilter} 
      />
      <TaskList tasks={filteredTasks} />
    </div>
  );
}