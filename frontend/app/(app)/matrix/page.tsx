// frontend/app/(app)/matrix/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Quadrant } from '@/components/matrix/Quadrant';
import { matrixTasksData, type MatrixTask } from '@/lib/mock-data';
import { Inbox, Zap, Calendar, UserMinus, Trash2 } from 'lucide-react';

type QuadrantId = 'do' | 'decide' | 'delegate' | 'delete' | 'inbox';

export default function MatrixPage() {
  const [tasks, setTasks] = useState(matrixTasksData);
  const [animatedQuadrantId, setAnimatedQuadrantId] = useState<QuadrantId | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const quadrantId = over.id as QuadrantId;
    const taskId = active.id as number;

    setTasks((prevTasks) => 
      prevTasks.map(task => {
        if (task.id !== taskId) return task;
        switch (quadrantId) {
          case 'inbox': return { ...task, isUrgent: null, isImportant: null };
          case 'do': return { ...task, isUrgent: true, isImportant: true };
          case 'decide': return { ...task, isUrgent: false, isImportant: true };
          case 'delegate': return { ...task, isUrgent: true, isImportant: false };
          case 'delete': return { ...task, isUrgent: false, isImportant: false };
          default: return task;
        }
      })
    );
    
    setAnimatedQuadrantId(quadrantId);
    setTimeout(() => setAnimatedQuadrantId(null), 1000);
  };

  if (!isMounted) {
    return null; 
  }

  const inboxTasks = tasks.filter(t => t.isUrgent === null);
  const doTasks = tasks.filter(t => t.isUrgent === true && t.isImportant === true);
  const decideTasks = tasks.filter(t => t.isUrgent === false && t.isImportant === true);
  const delegateTasks = tasks.filter(t => t.isUrgent === true && t.isImportant === false);
  const deleteTasks = tasks.filter(t => t.isUrgent === false && t.isImportant === false);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Matriz de Eisenhower</h1>
      <p className="text-muted-foreground mb-6">
        Organiza tus tareas arrastrándolas al cuadrante correspondiente.
      </p>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1">
            <Quadrant id="inbox" title="Entrada" tasks={inboxTasks} icon={<Inbox className="w-5 h-5" />} isAnimating={animatedQuadrantId === 'inbox'} />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Quadrant id="do" title="Hacer" tasks={doTasks} icon={<Zap className="w-5 h-5 text-green-500" />} isAnimating={animatedQuadrantId === 'do'} />
            <Quadrant id="decide" title="Decidir" tasks={decideTasks} icon={<Calendar className="w-5 h-5 text-blue-500" />} isAnimating={animatedQuadrantId === 'decide'} />
            <Quadrant id="delegate" title="Delegar" tasks={delegateTasks} icon={<UserMinus className="w-5 h-5 text-yellow-500" />} isAnimating={animatedQuadrantId === 'delegate'} />
            <Quadrant id="delete" title="Eliminar" tasks={deleteTasks} icon={<Trash2 className="w-5 h-5 text-red-500" />} isAnimating={animatedQuadrantId === 'delete'} />
          </div>
        </div>
      </DndContext>
    </div>
  );
}