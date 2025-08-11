// frontend/components/home/UserInfo.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';

const moods = [
  { mood: 'Feliz', emoji: '😊', color: 'ring-green-500' },
  { mood: 'Normal', emoji: '😐', color: 'ring-yellow-500' },
  { mood: 'Cansado', emoji: '😩', color: 'ring-blue-500' },
  { mood: 'Estresado', emoji: '🤯', color: 'ring-red-500' },
];

export function UserInfo() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Usuario');
  const [avatarUrl, setAvatarUrl] = useState<string>('https://github.com/shadcn.png');

  useEffect(() => {
    (async () => {
      try {
        const profile: any = await api.getProfile();
        setUserName(profile?.nombre || 'Usuario');
        if (profile?.avatar) setAvatarUrl(profile.avatar);
      } catch {
        // Ignorar, user seguirá con valores por defecto
      }
    })();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <Card className="p-6">
      <motion.div 
        className="flex items-center gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={avatarUrl} 
          alt="Avatar del usuario" 
          className="h-20 w-20 rounded-full border-4 border-primary/20"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">
            {getGreeting()}, <span className="text-primary">{userName}</span>!
          </h2>
          <p className="text-md text-muted-foreground mt-1">¿Cómo te sientes hoy?</p>
          <div className="flex items-center gap-4 mt-4">
            {moods.map(({ mood, emoji, color }) => (
              <motion.button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={clsx(
                  'text-3xl p-2 rounded-full transition-all duration-300 focus:outline-none',
                  selectedMood === mood ? `ring-2 ${color} scale-110` : 'hover:scale-110 grayscale hover:grayscale-0'
                )}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                title={mood}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </Card>
  );
}

export default UserInfo;