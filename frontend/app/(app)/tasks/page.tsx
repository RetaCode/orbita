'use client';

import { useState, useMemo, useEffect } from 'react';
import { TaskList } from '@/components/tasks/TaskList';
import { TasksToolbar } from '@/components/tasks/TasksToolbar';
import { api } from '@/lib/api';
import type { TaskData } from '@/lib/mock-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState('todos');
  const [priorityFilter, setPriorityFilter] = useState('todas');
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<{ titulo: string; fecha_vencimiento: string; prioridad: 'baja'|'media'|'alta'|'critica'; descripcion?: string }>({ titulo: '', fecha_vencimiento: '', prioridad: 'media' });

  const reload = async () => {
    try {
      const data = await api.getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      setTasks([]);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const statusMatch = statusFilter === 'todos' || task.estado === statusFilter;
      const priorityMatch = priorityFilter === 'todas' || task.prioridad === priorityFilter;
      return statusMatch && priorityMatch;
    });
  }, [statusFilter, priorityFilter, tasks]);

  const createTask = async () => {
    try {
      const body: any = {
        titulo: form.titulo,
        descripcion: form.descripcion || '',
        prioridad: form.prioridad,
      };
      if (form.fecha_vencimiento) {
        body.fecha_vencimiento = new Date(form.fecha_vencimiento).toISOString();
      }
      await api.createTask(body);
      setIsOpen(false);
      setForm({ titulo: '', fecha_vencimiento: '', prioridad: 'media' });
      await reload();
      Swal.fire({ icon: 'success', title: 'Tarea creada', timer: 1200, showConfirmButton: false });
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'No se pudo crear la tarea', text: e?.message || 'Intenta nuevamente' });
    }
  }

  return (
    <div>
      <TasksToolbar 
        onStatusChange={setStatusFilter} 
        onPriorityChange={setPriorityFilter} 
        onNewTask={() => setIsOpen(true)}
      />

      <TaskList tasks={filteredTasks} />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Tarea</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium">Título</label>
              <Input value={form.titulo} onChange={(e) => setForm(v => ({ ...v, titulo: e.target.value }))} placeholder="Título de la tarea" />
            </div>
            <div>
              <label className="block text-sm font-medium">Fecha de vencimiento</label>
              <Input type="date" value={form.fecha_vencimiento} onChange={(e) => setForm(v => ({ ...v, fecha_vencimiento: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium">Prioridad</label>
              <Select value={form.prioridad} onValueChange={(val) => setForm(v => ({ ...v, prioridad: val as any }))}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Selecciona" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="critica">Crítica</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium">Descripción (opcional)</label>
              <Input value={form.descripcion || ''} onChange={(e) => setForm(v => ({ ...v, descripcion: e.target.value }))} placeholder="Descripción" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
            <Button onClick={createTask} disabled={!form.titulo}>Crear</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}