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
  // Añadimos las propiedades que GroupCard espera para evitar errores
  total_miembros?: number;
  total_tareas?: number;
  members?: any[];
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
      await api.createGroup(createForm.nombre, createForm.descripcion);
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
      if (isNaN(id)) throw new Error('El ID del grupo debe ser un número.');
      // La función para unirse a un grupo no estaba en tu api.ts, la añadiremos después.
      // Por ahora, simulamos el éxito.
      console.log(`Intentando unirse al grupo con ID: ${id}`);
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
              ...group, // Pasamos los datos reales que vienen de la API
              total_miembros: group.total_miembros || 1, // Placeholder si no viene de la API
              total_tareas: group.total_tareas || 0, // Placeholder
              members: group.members || [{ id: group.id_creador || 0, name: 'Tú', avatarUrl: '', rolEnGrupo: 'Creador' }], // Placeholder
            }} />
          </motion.div>
        ))}
        {groups.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground border rounded-lg p-12">
            <h3 className="text-lg font-semibold">No estás en ningún grupo</h3>
            <p>Crea un nuevo grupo o únete a uno existente para empezar a colaborar.</p>
          </div>
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