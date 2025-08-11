// frontend/components/timer/SessionTaskList.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import type { TaskData } from '@/lib/mock-data';

interface SessionTask extends TaskData {
  // Podemos añadir propiedades específicas de la sesión si es necesario en el futuro
}

interface SessionTaskListProps {
  tasks: SessionTask[];
  setTasks: React.Dispatch<React.SetStateAction<SessionTask[]>>;
  currentTaskId: number | null;
  setCurrentTaskId: (id: number | null) => void;
  importTasks: () => void; // Función para importar tareas existentes
}

export function SessionTaskList({ tasks, setTasks, currentTaskId, setCurrentTaskId, importTasks }: SessionTaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      const newTask: SessionTask = {
        id_tarea: Date.now(),
        titulo: newTaskTitle,
        estado: 'pendiente',
        prioridad: 'media', // Prioridad por defecto para tareas rápidas
        fecha_vencimiento: null,
        nombre_grupo: null,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(t => 
      t.id_tarea === taskId 
        ? { ...t, estado: t.estado === 'completada' ? 'pendiente' : 'completada' } 
        : t
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tareas de la Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <Input 
            value={newTaskTitle} 
            onChange={e => setNewTaskTitle(e.target.value)} 
            placeholder="Añadir una tarea rápida..." 
          />
          <Button type="submit" size="icon" variant="outline"><Plus className="h-4 w-4" /></Button>
        </form>
        
        <Button onClick={importTasks} variant="link" className="p-0 h-auto mb-4 text-sm">
          O importar desde Mis Tareas
        </Button>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id_tarea}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => setCurrentTaskId(task.id_tarea)}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer border-2 transition-all",
                  currentTaskId === task.id_tarea ? 'bg-accent border-primary' : 'border-transparent hover:bg-muted/50'
                )}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se seleccione la tarea al completarla
                    toggleTaskCompletion(task.id_tarea);
                  }}
                  className={clsx('flex-shrink-0 h-5 w-5 border-2 rounded-full flex items-center justify-center transition-all', {
                    'border-green-500 bg-green-500 text-white': task.estado === 'completada',
                    'border-muted-foreground': task.estado !== 'completada',
                  })}
                >
                  {task.estado === 'completada' && <Check className="h-3 w-3" />}
                </button>
                <div className={clsx("flex-grow font-medium text-sm", { "line-through text-muted-foreground": task.estado === 'completada' })}>
                  {task.titulo}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}