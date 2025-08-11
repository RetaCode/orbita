// frontend/app/(app)/groups/page.tsx
'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GroupsToolbar } from '@/components/groups/GroupsToolbar';
import { GroupCard } from '@/components/groups/GroupCard';
import { api } from '@/lib/api';

interface GrupoApi {
  id_grupo: number;
  nombre: string;
  descripcion?: string;
  id_creador?: number;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<GrupoApi[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getGroups();
        setGroups(Array.isArray(data) ? data : []);
      } catch {
        setGroups([]);
      }
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GroupsToolbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groups.map((group, index) => (
          <motion.div
            key={group.id_grupo}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {/* Adaptamos a la interfaz esperada por GroupCard con placeholders */}
            <GroupCard group={{
              id_grupo: group.id_grupo,
              nombre: group.nombre,
              total_miembros: 1,
              total_tareas: 0,
              members: [{ id: group.id_creador || 0, name: 'Tú', avatarUrl: 'https://github.com/shadcn.png', rolEnGrupo: 'Creador' }],
            }} />
          </motion.div>
        ))}
        {groups.length === 0 && (
          <div className="col-span-full text-sm text-muted-foreground border rounded-lg p-6">No hay grupos disponibles.</div>
        )}
      </div>
    </motion.div>
  );
}