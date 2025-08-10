// frontend/components/home/QuickGuide.tsx
import Link from 'next/link';
import { Timer, LayoutGrid, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const methods = [
  { title: 'Sesión Pomodoro', description: 'Trabaja en sprints de 25 minutos.', icon: <Timer className="w-8 h-8 text-red-500" />, href: '/timer/pomodoro', borderColor: 'hover:border-red-500' },
  { title: 'Crear Timebox', description: 'Asigna un bloque de tiempo fijo a una tarea.', icon: <LayoutGrid className="w-8 h-8 text-blue-500" />, href: '/timer/timeboxing', borderColor: 'hover:border-blue-500' },
  { title: 'Nueva Tarea Rápida', description: 'Añade una tarea a tu lista sin perder el enfoque.', icon: <ClipboardCheck className="w-8 h-8 text-green-500" />, href: '/tasks/new', borderColor: 'hover:border-green-500' },
];

export function QuickGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Guía Rápida</CardTitle>
        <CardDescription>Empieza una sesión de enfoque o añade una tarea ahora.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {methods.map((method) => (
            <Link href={method.href} key={method.title} className="group">
              <div className={`p-4 border rounded-lg h-full flex flex-col items-start gap-2 transition-all duration-200 ${method.borderColor} hover:bg-accent`}>
                {method.icon}
                <h3 className="font-semibold text-md">{method.title}</h3>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickGuide;