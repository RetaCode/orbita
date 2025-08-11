import { CheckCircle2, Users, ListTodo } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PerfilData } from '@/lib/mock-data';

interface StatisticsCardProps {
  stats: Pick<PerfilData, 'total_tareas' | 'tareas_completadas' | 'grupos_activos'>;
}

export function StatisticsCard({ stats }: StatisticsCardProps) {
  const efficiency = stats.total_tareas > 0 
    ? Math.round((stats.tareas_completadas / stats.total_tareas) * 100)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <CheckCircle2 className="h-5 w-5 mr-3 text-primary" />
          <span className="font-medium">Eficiencia de Tareas:</span>
          <span className="ml-auto font-bold">{efficiency}%</span>
        </div>
        <div className="flex items-center">
          <ListTodo className="h-5 w-5 mr-3 text-primary" />
          <span className="font-medium">Tareas Completadas:</span>
          <span className="ml-auto font-bold">{stats.tareas_completadas}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-3 text-primary" />
          <span className="font-medium">Grupos Activos:</span>
          <span className="ml-auto font-bold">{stats.grupos_activos}</span>
        </div>
      </CardContent>
    </Card>
  );
}