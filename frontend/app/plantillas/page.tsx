"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/app/components/RequireAuth";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function PlantillasPage() {
  const [plantillas, setPlantillas] = useState<any[]>([])
  const [mis, setMis] = useState<any[]>([])

  const load = async () => {
    try {
      const [all, mine] = await Promise.all([api.getPlantillas(), api.getMisPlantillas()])
      setPlantillas(all)
      setMis(mine)
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo cargar' })
    }
  }

  useEffect(() => { load() }, [])

  const select = async (id: number) => {
    try {
      await api.seleccionarPlantilla(id)
      await load()
      Swal.fire({ icon: 'success', title: 'Seleccionada', text: 'Plantilla seleccionada' })
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo seleccionar' })
    }
  }

  return (
    <RequireAuth>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Plantillas</h1>

        <section>
          <h2 className="font-medium mb-2">Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plantillas.map((p) => (
              <div key={p.id_plantilla} className="border rounded p-4">
                <div className="font-medium">{p.nombre}</div>
                <div className="text-sm text-gray-600">{p.descripcion}</div>
                <Button className="mt-2" onClick={() => select(p.id_plantilla)}>Usar</Button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-medium mb-2">Mis plantillas</h2>
          <div className="space-y-2">
            {mis.map((m) => (
              <div key={m.id_plantilla} className="border rounded p-3 text-sm">
                {m.nombre} • Seleccionada: {m.fecha_seleccion}
              </div>
            ))}
          </div>
        </section>
      </div>
    </RequireAuth>
  )
}