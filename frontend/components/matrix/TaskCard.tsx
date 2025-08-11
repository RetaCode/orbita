// frontend/components/matrix/TaskCard.tsx
'use client';
import { useDraggable } from '@dnd-kit/core';
import { clsx } from 'clsx';
import { Card } from '@/components/ui/card';
import type { MatrixTask } from '@/lib/mock-data';

interface TaskCardProps {
  task: MatrixTask;
}

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={clsx(
        'p-3 mb-2 cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-50 shadow-lg'
      )}
    >
      <p className="font-medium text-sm">{task.title}</p>
    </Card>
  );
}