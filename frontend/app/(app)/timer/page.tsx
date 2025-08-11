// frontend/app/(app)/timer/page.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw, Plus } from 'lucide-react';
import { useAudio } from 'react-use';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { clsx } from 'clsx';
import { tasksData } from '@/lib/mock-data';
import type { TaskData } from '@/lib/mock-data';
import { SessionTaskList } from '@/components/timer/SessionTaskList';

const MODES = {
  pomodoro: { id: 'pomodoro', label: 'Pomodoro', duration: 25 * 60 },
  shortBreak: { id: 'shortBreak', label: 'Descanso Corto', duration: 5 * 60 },
  longBreak: { id: 'longBreak', label: 'Descanso Largo', duration: 15 * 60 },
  timebox: { id: 'timebox', label: 'Timeboxing', duration: 0 }, // El tiempo se define por tarea
};

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak' | 'timebox';

interface Task extends TaskData {}

export default function FocusTimerPage() {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(MODES.pomodoro.duration);
  const [isActive, setIsActive] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);

  const [sessionTasks, setSessionTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [audio, state, controls] = useAudio({
    src: '/notification.mp3',
  });

  const currentTask = sessionTasks.find(t => t.id_tarea === currentTaskId);

  const getDuration = useCallback(() => {
    if (mode === 'timebox') {
      if (!currentTask) return 15 * 60; // Default de 15 min si no hay tarea
      switch (currentTask.prioridad) {
        case 'critica': return 25 * 60;
        case 'alta': return 45 * 60;
        case 'media': return 60 * 60;
        case 'baja': return 90 * 60;
        default: return 30 * 60;
      }
    }
    return MODES[mode as keyof typeof DURATION_CONFIG].duration;
  }, [mode, currentTask]);
  
  const DURATION_CONFIG = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      controls.play();
      toast.success(mode === 'pomodoro' ? "¡Sesión completada! Tiempo de un descanso." : "¡El descanso terminó!");
      if (mode === 'pomodoro') {
        const newPomodoros = pomodoros + 1;
        setPomodoros(newPomodoros);
        const nextMode = newPomodoros % 4 === 0 ? 'longBreak' : 'shortBreak';
        switchMode(nextMode);
      } else {
        setIsActive(false);
      }
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, timeLeft, mode, pomodoros, controls]);

  useEffect(() => {
    document.title = `${formatTime(timeLeft)} - ${MODES[mode].label}`;
  }, [timeLeft, mode]);

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(getDuration());
  };
  
  useEffect(() => {
    if(mode === 'timebox') {
        setTimeLeft(getDuration());
        setIsActive(false);
    }
  }, [currentTaskId, getDuration, mode]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = timeLeft > 0 ? 1 - (timeLeft / getDuration()) : 1;

  const importTasks = () => {
    const tasksToImport = tasksData
      .filter(mainTask => !sessionTasks.some(sessionTask => sessionTask.id_tarea === mainTask.id_tarea))
      .slice(0, 3);
    setSessionTasks([...sessionTasks, ...tasksToImport]);
    toast.info(`${tasksToImport.length} tareas importadas.`);
  };

  return (
    <>
      {audio} {/* <-- ¡AQUÍ ESTÁ LA LÍNEA QUE FALTABA! */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-center gap-2 mb-8">
                {Object.values(MODES).map(m => (
                  <Button key={m.id} variant={mode === m.id ? 'default' : 'ghost'} onClick={() => switchMode(m.id as TimerMode)}>
                    {m.label}
                  </Button>
                ))}
              </div>
              <div className="relative h-64 w-64 mx-auto">
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  <circle className="stroke-muted/50" cx="50" cy="50" r="45" strokeWidth="4" fill="transparent" />
                  <motion.circle
                    className="stroke-primary" cx="50" cy="50" r="45"
                    strokeWidth="4" fill="transparent" strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    strokeDasharray="282.74"
                    animate={{ strokeDashoffset: 282.74 * (1 - progress) }}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl font-bold font-mono">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Button onClick={() => setIsActive(!isActive)} size="lg" className="w-48 h-16 text-2xl rounded-full shadow-lg">
                {isActive ? <Pause className="mr-2 h-8 w-8" /> : <Play className="mr-2 h-8 w-8" />}
                {isActive ? 'PAUSAR' : 'INICIAR'}
              </Button>
              <p className="text-muted-foreground text-center h-6 truncate px-4">
                {currentTask ? `Enfocado en: ${currentTask.titulo}` : 'Selecciona una tarea para empezar'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SessionTaskList 
            tasks={sessionTasks}
            setTasks={setSessionTasks}
            currentTaskId={currentTaskId}
            setCurrentTaskId={setCurrentTaskId}
            importTasks={importTasks}
          />
        </motion.div>
      </div>
    </>
  );
}