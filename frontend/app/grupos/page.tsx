"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/app/components/RequireAuth";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function GruposPage() {
  const [grupos, setGrupos] = useState<any[]>([])
  const [form, setForm] = useState({ nombre: "", descripcion: "" })
  const [joinId, setJoinId] = useState("")

  const load = async () => {
    try {
      const data = await api.getGrupos()
      setGrupos(data)
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudieron cargar los grupos' })
    }
  }

  useEffect(() => { load() }, [])

  const create = async () => {
    try {
      if (!form.nombre.trim()) return
      await api.createGrupo(form)
      setForm({ nombre: "", descripcion: "" })
      await load()
      Swal.fire({ icon: 'success', title: 'Creado', text: 'Grupo creado' })
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo crear' })
    }
  }

  const join = async () => {
    try {
      const id = Number(joinId)
      if (!id) return
      await api.joinGrupo(id)
      setJoinId("")
      await load()
      Swal.fire({ icon: 'success', title: 'Unido', text: 'Te uniste al grupo' })
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo unir' })
    }
  }

  return (
    <RequireAuth>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Grupos</h1>
        <div className="border rounded p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            <Input placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
            <Button onClick={create}>Crear grupo</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="ID grupo para unirse" value={joinId} onChange={(e) => setJoinId(e.target.value)} />
            <div />
            <Button variant="outline" onClick={join}>Unirme</Button>
          </div>
        </div>

        <div className="space-y-3">
          {grupos.map((g) => (
            <div key={g.id_grupo} className="border rounded p-4">
              <div className="font-medium">{g.nombre}</div>
              <div className="text-sm text-gray-600">{g.descripcion}</div>
              <div className="text-xs text-gray-500">ID: {g.id_grupo}</div>
            </div>
          ))}
        </div>
      </div>
    </RequireAuth>
  )
}