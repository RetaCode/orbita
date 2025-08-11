// frontend/components/home/TasksSummary.tsx
'use client';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface Task {
  id_tarea: number;
  titulo: string;
  prioridad: 'baja' | 'media' | 'alta' | 'critica' | string;
  estado: 'pendiente' | 'en_progreso' | 'completada' | string;
}

const PriorityBadge = ({ priority }: { priority: 'baja' | 'media' | 'alta' | 'critica' | string }) => (
  <span
    className={clsx('px-2 py-1 text-xs font-semibold rounded-full', {
        'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300': priority === 'critica' || priority === 'alta',
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300': priority === 'media',
        'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300': priority === 'baja',
    })}
  >
    {String(priority).charAt(0).toUpperCase() + String(priority).slice(1)}
  </span>
);

export function TasksSummary() {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const todayTasks = useMemo(() => tasks.slice(0, 3), [tasks]);

  const pendingCount = useMemo(() => tasks.filter(t => t.estado !== 'completada').length, [tasks]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tareas para Hoy</CardTitle>
          <CardDescription>Tienes {pendingCount} tareas pendientes.</CardDescription>
        </div>
        <Link href="/tasks"><Button variant="ghost" size="sm">Ver todas <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todayTasks.map((task) => {
            const isCompleted = task.estado === 'completada';
            return (
              <div key={task.id_tarea} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <button className={clsx('flex-shrink-0 h-6 w-6 border-2 rounded flex items-center justify-center transition-all', {
                  'border-primary bg-primary text-primary-foreground': isCompleted,
                  'border-muted-foreground': !isCompleted,
                })}>
                  {isCompleted && <Check className="h-4 w-4" />}
                </button>
                <div className="flex-grow">
                  <p className={clsx('font-medium', { 'line-through text-muted-foreground': isCompleted })}>{task.titulo}</p>
                </div>
                <div className="flex-shrink-0"><PriorityBadge priority={task.prioridad} /></div>
              </div>
            );
          })}
          {todayTasks.length === 0 && (
            <p className="text-sm text-muted-foreground">No hay tareas por ahora.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default TasksSummary;