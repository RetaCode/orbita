// frontend/components/tasks/TaskItem.tsx
'use client';
import { clsx } from 'clsx';
import { Check, Clock, Users } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import type { TaskData } from '@/lib/mock-data';

const PriorityBadge = ({ priority }: { priority: TaskData['prioridad'] }) => (
  <span
    className={clsx(
      'px-2 py-0.5 text-xs font-semibold rounded-full', {
        'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300': priority === 'critica',
        'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300': priority === 'alta',
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300': priority === 'media',
        'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300': priority === 'baja',
    })}
  >
    {priority.charAt(0).toUpperCase() + priority.slice(1)}
  </span>
);

export function TaskItem({ task }: { task: TaskData }) {
  const isCompleted = task.estado === 'completada';
  return (
    <div className="flex items-start gap-4 p-4 border-b hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0 mt-1">
        <button
          className={clsx('h-6 w-6 border-2 rounded-full flex items-center justify-center transition-all', {
            'border-green-500 bg-green-500 text-white': isCompleted,
            'border-muted-foreground': !isCompleted,
          })}
        >
          {isCompleted && <Check className="h-4 w-4" />}
        </button>
      </div>
      <div className="flex-grow">
        <p className={clsx('font-medium', { 'line-through text-muted-foreground': isCompleted })}>
          {task.titulo}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
          {task.fecha_vencimiento && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Vence: {format(parseISO(task.fecha_vencimiento), 'dd MMM', { locale: es })}</span>
            </div>
          )}
          {task.nombre_grupo && (
             <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{task.nombre_grupo}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        <PriorityBadge priority={task.prioridad} />
      </div>
    </div>
  );
}