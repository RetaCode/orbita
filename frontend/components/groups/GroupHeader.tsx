// frontend/components/groups/GroupHeader.tsx
'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { GroupDetailData } from "@/lib/mock-data";

export function GroupHeader({ group }: { group: GroupDetailData }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">{group.nombre}</h1>
      <p className="text-muted-foreground mt-2">{group.descripcion}</p>
      <div className="flex items-center mt-4">
        <div className="flex -space-x-2">
          {group.members.map((member) => (
            <Avatar key={member.id} className="border-2 border-background h-8 w-8">
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="ml-3 text-sm font-medium">{group.total_miembros} miembros</span>
      </div>
    </div>
  );
}