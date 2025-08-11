// frontend/components/groups/GroupCard.tsx
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, ListChecks } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // 1. Importamos los componentes de Avatar
import type { GroupData } from '@/lib/mock-data';

export function GroupCard({ group }: { group: GroupData & { total_tareas: number } }) {
  const visibleMembers = group.members.slice(0, 3); // Mostramos un máximo de 3 avatares
  const remainingMembers = group.total_miembros - visibleMembers.length;

  return (
    <Link href={`/groups/${group.id_grupo}`}>
      <Card className="hover:border-primary hover:shadow-lg transition-all duration-200 h-full flex flex-col">
        <CardHeader>
          <CardTitle className="truncate">{group.nombre}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            <span>{group.total_tareas} Tareas</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end">
          
          {/* 2. Aquí está la nueva sección de avatares */}
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {visibleMembers.map((member) => (
                <Avatar key={member.id} className="border-2 border-background">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
              {remainingMembers > 0 && (
                <Avatar className="border-2 border-background">
                  <AvatarFallback>+{remainingMembers}</AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{group.total_miembros} Miembros</span>
            </div>
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}