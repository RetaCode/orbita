// frontend/app/(app)/calendar/page.tsx
'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { tasksData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Circle, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Swal from 'sweetalert2';

export default function CalendarPage() {
  const events = tasksData
    .filter(task => task.fecha_vencimiento !== null)
    .map(task => ({
      id: `task-${task.id_tarea}`,
      title: task.titulo,
      start: task.fecha_vencimiento!,
      allDay: true,
      extendedProps: {
        type: 'task',
        priority: task.prioridad,
        status: task.estado,
      },
      className: `fc-event-${task.prioridad}`
    }));

  const handleDateClick = (arg: any) => {
    Swal.fire({
      title: 'Crear Nuevo Evento',
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Título del evento">
        <input id="swal-date" type="date" class="swal2-input" value="${arg.dateStr}">
      `,
      confirmButtonText: 'Crear',
      showCancelButton: true,
      preConfirm: () => {
        const title = (document.getElementById('swal-title') as HTMLInputElement).value;
        if (!title) {
          Swal.showValidationMessage(`Por favor, ingresa un título`);
        }
        return { title };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Nuevo evento:', result.value);
        Swal.fire('¡Creado!', 'Tu evento ha sido añadido.', 'success');
      }
    });
  };

  const handleEventClick = (arg: any) => {
    const { title, extendedProps } = arg.event;
    Swal.fire({
      title: title,
      html: `
        <p><strong>Prioridad:</strong> ${extendedProps.priority}</p>
        <p><strong>Estado:</strong> ${extendedProps.status}</p>
      `,
      icon: 'info'
    });
  };
  
  // Componente personalizado para renderizar cada evento
  const renderEventContent = (eventInfo: any) => {
    const { priority, status } = eventInfo.event.extendedProps;
    const isCompleted = status === 'completada';
    
    const priorityColors = {
        critica: 'bg-red-500',
        alta: 'bg-orange-500',
        media: 'bg-yellow-500',
        baja: 'bg-green-500',
    };

    return (
      <div className="flex items-center gap-2 p-1 text-white text-xs w-full overflow-hidden">
        <div className={`w-1.5 h-full rounded-l-md flex-shrink-0 ${priorityColors[priority as keyof typeof priorityColors]}`}></div>
        <div className="flex-shrink-0">
            {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
        </div>
        <p className="truncate font-medium">{eventInfo.event.title}</p>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Calendario</h1>
        {/* Aquí podrías añadir un botón para crear un nuevo evento */}
      </div>

      <Card className="p-4 shadow-lg">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          editable={true}
          selectable={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="80vh"
          locale="es"
          buttonText={{
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
          }}
          eventContent={renderEventContent} // Usamos nuestro renderizador personalizado
        />
      </Card>
    </motion.div>
  );
}