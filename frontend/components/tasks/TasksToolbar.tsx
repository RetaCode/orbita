// frontend/components/tasks/TasksToolbar.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';

interface TasksToolbarProps {
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
}

export function TasksToolbar({ onStatusChange, onPriorityChange }: TasksToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold">Mis Tareas</h1>
        <p className="text-muted-foreground">Organiza y gestiona todas tus actividades.</p>
      </div>
      <div className="flex items-center gap-2">
        <Select onValueChange={onStatusChange} defaultValue="todos">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="en_progreso">En Progreso</SelectItem>
            <SelectItem value="completada">Completada</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onPriorityChange} defaultValue="todas">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las prioridades</SelectItem>
            <SelectItem value="critica">Crítica</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
            <SelectItem value="media">Media</SelectItem>
            <SelectItem value="baja">Baja</SelectItem>
          </SelectContent>
        </Select>

        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Nueva Tarea
        </Button>
      </div>
    </div>
  );
}