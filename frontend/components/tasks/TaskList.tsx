// frontend/components/tasks/TaskList.tsx
import { TaskItem } from './TaskItem';
import type { TaskData } from '@/lib/mock-data';

interface TaskListProps {
  tasks: TaskData[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h3 className="text-lg font-medium">No hay tareas que mostrar</h3>
        <p className="text-muted-foreground">¡Intenta cambiar los filtros o crea una nueva tarea!</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      {tasks.map((task) => (
        // **LA CORRECCIÓN ESTÁ AQUÍ**
        // Movemos el 'key' del TaskItem al div que lo envuelve.
        <div key={task.id_tarea} className="[&:not(:last-child)]:border-b">
          <TaskItem task={task} />
        </div>
      ))}
    </div>
  );
}