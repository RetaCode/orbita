"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/app/components/RequireAuth";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function EventosPage() {
  const [eventos, setEventos] = useState<any[]>([])
  const [form, setForm] = useState({ titulo: "", descripcion: "", fecha_hora_inicio: "", fecha_hora_fin: "", tipo_evento: "personal" })

  const load = async () => {
    try {
      const data = await api.getEventos()
      setEventos(data)
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudieron cargar los eventos' })
    }
  }

  useEffect(() => { load() }, [])

  const create = async () => {
    try {
      if (!form.titulo.trim() || !form.fecha_hora_inicio.trim()) return
      await api.createEvento(form)
      setForm({ titulo: "", descripcion: "", fecha_hora_inicio: "", fecha_hora_fin: "", tipo_evento: "personal" })
      await load()
      Swal.fire({ icon: 'success', title: 'Creado', text: 'Evento creado' })
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo crear' })
    }
  }

  return (
    <RequireAuth>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Eventos</h1>
        <div className="border rounded p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <Input placeholder="Título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
            <Input placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
            <Input placeholder="Inicio (YYYY-MM-DDTHH:mm:ss)" value={form.fecha_hora_inicio} onChange={(e) => setForm({ ...form, fecha_hora_inicio: e.target.value })} />
            <Input placeholder="Fin (YYYY-MM-DDTHH:mm:ss)" value={form.fecha_hora_fin} onChange={(e) => setForm({ ...form, fecha_hora_fin: e.target.value })} />
            <Input placeholder="Tipo (personal)" value={form.tipo_evento} onChange={(e) => setForm({ ...form, tipo_evento: e.target.value })} />
          </div>
          <Button onClick={create}>Crear</Button>
        </div>

        <div className="space-y-3">
          {eventos.map((ev) => (
            <div key={ev.id_evento} className="border rounded p-4">
              <div className="font-medium">{ev.titulo}</div>
              <div className="text-sm text-gray-600">{ev.descripcion}</div>
              <div className="text-xs text-gray-500">Inicio: {ev.fecha_hora_inicio} • Fin: {ev.fecha_hora_fin || '-'}</div>
            </div>
          ))}
        </div>
      </div>
    </RequireAuth>
  )
}