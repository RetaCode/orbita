// frontend/app/(app)/groups/page.tsx
'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GroupsToolbar } from '@/components/groups/GroupsToolbar';
import { GroupCard } from '@/components/groups/GroupCard';
import { api } from '@/lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';

interface GrupoApi {
  id_grupo: number;
  nombre: string;
  descripcion?: string;
  id_creador?: number;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<GrupoApi[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [createForm, setCreateForm] = useState({ nombre: '', descripcion: '' });
  const [joinForm, setJoinForm] = useState({ id: '' });

  const reload = async () => {
    try {
      const data = await api.getGroups();
      setGroups(Array.isArray(data) ? data : []);
    } catch {
      setGroups([]);
    }
  };

  useEffect(() => { reload(); }, []);

  const onCreate = async () => {
    try {
      await api.post('/api/grupos', { nombre: createForm.nombre, descripcion: createForm.descripcion });
      setOpenCreate(false);
      setCreateForm({ nombre: '', descripcion: '' });
      await reload();
      Swal.fire({ icon: 'success', title: 'Grupo creado', timer: 1200, showConfirmButton: false });
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'No se pudo crear el grupo', text: e?.message || 'Intenta nuevamente' });
    }
  };

  const onJoin = async () => {
    try {
      const id = parseInt(joinForm.id, 10);
      if (!id) throw new Error('ID inválido');
      await api.post(`/api/grupos/${id}/join`, { rol_en_grupo: 'miembro' });
      setOpenJoin(false);
      setJoinForm({ id: '' });
      await reload();
      Swal.fire({ icon: 'success', title: 'Te uniste al grupo', timer: 1200, showConfirmButton: false });
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'No se pudo unir al grupo', text: e?.message || 'Intenta nuevamente' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GroupsToolbar onCreate={() => setOpenCreate(true)} onJoin={() => setOpenJoin(true)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groups.map((group, index) => (
          <motion.div
            key={group.id_grupo}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
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

      {/* Crear Grupo */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Crear Grupo</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <Input value={createForm.nombre} onChange={(e) => setCreateForm(v => ({ ...v, nombre: e.target.value }))} placeholder="Nombre del grupo" />
            </div>
            <div>
              <label className="block text-sm font-medium">Descripción</label>
              <Input value={createForm.descripcion} onChange={(e) => setCreateForm(v => ({ ...v, descripcion: e.target.value }))} placeholder="Descripción (opcional)" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenCreate(false)}>Cancelar</Button>
            <Button onClick={onCreate} disabled={!createForm.nombre}>Crear</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unirse a Grupo */}
      <Dialog open={openJoin} onOpenChange={setOpenJoin}>
        <DialogContent>
          <DialogHeader><DialogTitle>Unirse a un Grupo</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium">ID del Grupo</label>
              <Input value={joinForm.id} onChange={(e) => setJoinForm(v => ({ ...v, id: e.target.value }))} placeholder="Ej: 12" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenJoin(false)}>Cancelar</Button>
            <Button onClick={onJoin} disabled={!joinForm.id}>Unirme</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}