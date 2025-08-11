"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/app/components/RequireAuth";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function EstadosPage() {
  const [estados, setEstados] = useState<any[]>([])
  const [estado, setEstado] = useState("")

  const load = async () => {
    try {
      const data = await api.getEstadosAnimo()
      setEstados(data)
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo cargar' })
    }
  }

  useEffect(() => { load() }, [])

  const add = async () => {
    try {
      if (!estado.trim()) return
      await api.registrarEstadoAnimo(estado)
      setEstado("")
      await load()
      Swal.fire({ icon: 'success', title: 'Registrado', text: 'Estado de ánimo registrado' })
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo registrar' })
    }
  }

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Estados de ánimo</h1>
        <div className="flex gap-2">
          <Input placeholder="Cómo te sientes" value={estado} onChange={(e) => setEstado(e.target.value)} />
          <Button onClick={add}>Registrar</Button>
        </div>
        <div className="space-y-2">
          {estados.map((e) => (
            <div key={e.id_estado} className="border rounded p-3 flex justify-between text-sm">
              <span>{e.estado}</span>
              <span className="text-gray-500">{e.fecha_registro}</span>
            </div>
          ))}
        </div>
      </div>
    </RequireAuth>
  )
}