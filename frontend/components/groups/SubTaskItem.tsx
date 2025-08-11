'use client';

import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SubTaskItem({ subTask, assignee }: { subTask: any, assignee: any }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
      <button className={clsx('flex-shrink-0 h-5 w-5 border-2 rounded flex items-center justify-center transition-all', {
        'border-primary bg-primary text-primary-foreground': subTask.isCompleted,
        'border-muted-foreground': !subTask.isCompleted,
      })}>
        {subTask.isCompleted && <Check className="h-3 w-3" />}
      </button>
      <div className={clsx("flex-grow font-medium text-sm", { "line-through text-muted-foreground": subTask.isCompleted })}>
        {subTask.title}
      </div>
      {assignee && (
        <Avatar className="h-6 w-6">
          <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
          <AvatarFallback className="text-xs">{assignee.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};