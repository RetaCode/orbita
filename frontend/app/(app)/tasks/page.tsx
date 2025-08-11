// frontend/app/(app)/tasks/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { TaskList } from '@/components/tasks/TaskList';
import { TasksToolbar } from '@/components/tasks/TasksToolbar';
import { api } from '@/lib/api';
import type { TaskData } from '@/lib/mock-data';

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState('todos');
  const [priorityFilter, setPriorityFilter] = useState('todas');
  const [tasks, setTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getTasks();
        setTasks(Array.isArray(data) ? data : []);
      } catch {
        setTasks([]);
      }
    })();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const statusMatch = statusFilter === 'todos' || task.estado === statusFilter;
      const priorityMatch = priorityFilter === 'todas' || task.prioridad === priorityFilter;
      return statusMatch && priorityMatch;
    });
  }, [statusFilter, priorityFilter, tasks]);

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