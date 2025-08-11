// frontend/components/groups/GroupMembersList.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { GroupDetailData } from "@/lib/mock-data";
import { clsx } from "clsx";
import { Crown, MoreHorizontal, Shield, UserCheck } from "lucide-react";
import { motion } from 'framer-motion';

const RoleBadge = ({ role }: { role: string }) => {
  const roleStyles = {
    Creador: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Moderador: 'bg-blue-100 text-blue-800 border-blue-300',
    Miembro: 'bg-gray-100 text-gray-800 border-gray-300',
  };
  const roleIcons = {
    Creador: <Crown className="h-3 w-3" />,
    Moderador: <Shield className="h-3 w-3" />,
    Miembro: <UserCheck className="h-3 w-3" />,
  };
  return (
    <span className={clsx("flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full border", roleStyles[role as keyof typeof roleStyles])}>
      {roleIcons[role as keyof typeof roleIcons]}
      {role}
    </span>
  );
};

export function GroupMembersList({ group }: { group: GroupDetailData }) {
  const calculateTaskCount = (memberId: number) => {
    return group.mainTasks.reduce((count, mainTask) => 
      count + mainTask.subTasks.filter(st => st.assignedTo === memberId).length, 0
    );
  };

  return (
    <Card>
      <div className="p-4 space-y-4">
        {group.members.map((member, index) => (
          <motion.div
            key={member.id}
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="font-bold">{member.name}</p>
              <p className="text-sm text-muted-foreground">{calculateTaskCount(member.id)} tareas asignadas</p>
            </div>
            <div className="flex items-center gap-4">
              <RoleBadge role={member.rolEnGrupo} />
              {/* Placeholder para el menú de acciones de administrador */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Cambiar rol</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Eliminar del grupo</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}