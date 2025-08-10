// frontend/components/home/GroupsSummary.tsx
import Link from 'next/link';
import { ArrowRight, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { userGroupsData } from '@/lib/mock-data';

export function GroupsSummary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Mis Grupos</CardTitle>
          <CardDescription>Acceso rápido a tus equipos.</CardDescription>
        </div>
        <Link href="/groups"><Button variant="ghost" size="sm">Ver todos <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {userGroupsData.map((group) => (
            <Link 
              href={`/groups/${group.id_grupo}`} 
              key={group.id_grupo}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0 h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-sm leading-tight">{group.nombre}</p>
                <p className="text-xs text-muted-foreground">{group.total_miembros} miembros</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default GroupsSummary;