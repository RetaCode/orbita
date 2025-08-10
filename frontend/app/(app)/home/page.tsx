import { UserInfo } from '@/components/home/UserInfo';
import { CalendarPreview } from '@/components/home/CalendarPreview';
import { TasksSummary } from '@/components/home/TasksSummary';
import { GroupsSummary } from '@/components/home/GroupsSummary';
import { QuickGuide } from '@/components/home/QuickGuide';

export default function HomePage() {
  // El div contenedor de la página ya no es necesario aquí, el layout se encarga.
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <UserInfo />
        <TasksSummary />
        <QuickGuide />
      </div>
      <div className="lg:col-span-1 flex flex-col gap-6">
        <CalendarPreview />
        <GroupsSummary />
      </div>
    </div>
  );
}