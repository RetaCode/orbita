// frontend/components/matrix/Quadrant.tsx
'use client';
import { useDroppable } from '@dnd-kit/core';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskCard } from './TaskCard';
import type { MatrixTask } from '@/lib/mock-data';

interface QuadrantProps {
  id: string;
  title: string;
  tasks: MatrixTask[];
  icon?: React.ReactNode;
  isAnimating: boolean;
  className?: string;
}

const iconAnimationVariants = {
  initial: { scale: 1, rotate: 0 },
  animate: { 
    scale: [1, 1.3, 1], 
    rotate: [0, 15, -15, 15, 0],
    transition: { duration: 0.5 }
  },
};

export function Quadrant({ id, title, tasks, icon, isAnimating, className }: QuadrantProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Card 
      ref={setNodeRef}
      className={clsx(
        'flex flex-col min-h-[300px] transition-colors',
        isOver ? 'bg-accent' : 'bg-muted/40',
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <motion.div
            variants={iconAnimationVariants}
            animate={isAnimating ? "animate" : "initial"}
          >
            {icon}
          </motion.div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {tasks.length > 0 ? (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">Suelta tareas aquí</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}