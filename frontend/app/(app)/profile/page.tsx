'use client';
import { useEffect, useState } from 'react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatisticsCard } from '@/components/profile/StatisticsCard';
import { SettingsTabs } from '@/components/profile/SettingsTabs';
import { api } from '@/lib/api';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getProfile();
        setProfileData(data);
      } catch {
        setProfileData(null);
      }
    })();
  }, []);

  if (!profileData) {
    return <div className="p-6 border rounded-lg">Cargando perfil...</div>;
  }

  const stats = {
    id_usuario: profileData.id_usuario,
    correo: profileData.correo,
    nombre: profileData.nombre,
    avatar: profileData.avatar || 'https://github.com/shadcn.png',
    has_google_auth: Boolean(profileData.google_id),
    total_tareas: 0,
    tareas_completadas: 0,
    grupos_activos: 0,
    preferencias: {
      tema: 'light' as const,
      idioma: 'es' as const,
      zona_horaria: 'America/Mexico_City',
      privacidad: { perfil_publico: false, mostrar_estado_animo: true },
      notificaciones: { tareas_vencidas: true, recordatorios_bienestar: false },
    },
  };

  return (
    <div className="space-y-6">
      <ProfileHeader user={stats} />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <StatisticsCard stats={stats} />
        </div>
        <div className="md:col-span-2">
          <SettingsTabs preferences={stats.preferencias} />
        </div>
      </div>
    </div>
  );
}