// frontend/components/home/CalendarPreview.tsx
'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const eventDays = [ new Date() ];

export function CalendarPreview() {
  const [selected, setSelected] = useState<Date>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendario</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          locale={es}
          showOutsideDays
          fixedWeeks
          modifiers={{ events: eventDays }}
          modifiersClassNames={{ events: 'event-day' }}
          
          components={{
            Chevron: ({ orientation }) => 
              orientation === 'left' 
                ? <ChevronLeft className="h-4 w-4" /> 
                : <ChevronRight className="h-4 w-4" />
          }}
          
          classNames={{
            months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center',
            caption_label: 'text-sm font-medium',
            nav: 'space-x-1 flex items-center',
            nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
            row: 'flex w-full mt-2',
            cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
            day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
            day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
            day_today: 'bg-accent text-accent-foreground',
            day_outside: 'text-muted-foreground opacity-50',
          }}
          footer={
            <div className="text-center text-sm mt-4 text-muted-foreground">
              Selecciona un día para ver tus tareas.
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}

export default CalendarPreview;