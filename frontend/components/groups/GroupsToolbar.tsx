// frontend/components/groups/GroupsToolbar.tsx
'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle, LogIn } from 'lucide-react';

export function GroupsToolbar() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">Mis Grupos</h1>
        <p className="text-muted-foreground">Tus espacios de trabajo colaborativo.</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <LogIn className="mr-2 h-4 w-4" /> Unirse a un Grupo
        </Button>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Crear Grupo
        </Button>
      </div>
    </div>
  );
}