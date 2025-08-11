"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/app/components/RequireAuth";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function TareasPage() {
  const [tareas, setTareas] = useState<any[]>([])
  const [form, setForm] = useState({ titulo: "", descripcion: "", fecha_vencimiento: "", prioridad: "media" })

  const load = async () => {
    try {
      const data = await api.getTareas()
      setTareas(data)
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudieron cargar las tareas' })
    }
  }

  useEffect(() => { load() }, [])

  const create = async () => {
    try {
      if (!form.titulo.trim()) return
      await api.createTarea({ ...form })
      setForm({ titulo: "", descripcion: "", fecha_vencimiento: "", prioridad: "media" })
      await load()
      Swal.fire({ icon: 'success', title: 'Creada', text: 'Tarea creada' })
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo crear' })
    }
  }

  const update = async (id: number, data: any) => {
    try {
      await api.updateTarea(id, data)
      await load()
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo actualizar' })
    }
  }

  return (
    <RequireAuth>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Tareas</h1>
        <div className="border rounded p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
            <Input placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
            <Input placeholder="Fecha vencimiento (YYYY-MM-DD)" value={form.fecha_vencimiento} onChange={(e) => setForm({ ...form, fecha_vencimiento: e.target.value })} />
            <Input placeholder="Prioridad (baja/media/alta)" value={form.prioridad} onChange={(e) => setForm({ ...form, prioridad: e.target.value })} />
          </div>
          <Button onClick={create}>Crear</Button>
        </div>

        <div className="space-y-3">
          {tareas.map((t) => (
            <div key={t.id_tarea} className="border rounded p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1">
                <div className="font-medium">{t.titulo}</div>
                <div className="text-sm text-gray-600">{t.descripcion}</div>
                <div className="text-xs text-gray-500">Vence: {t.fecha_vencimiento || '-'} • Prioridad: {t.prioridad} • Estado: {t.estado}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => update(t.id_tarea, { estado: 'en_progreso' })}>En progreso</Button>
                <Button variant="outline" onClick={() => update(t.id_tarea, { estado: 'completada' })}>Completar</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RequireAuth>
  )
}