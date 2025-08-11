"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/app/components/RequireAuth";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function PerfilPage() {
  const [loading, setLoading] = useState(true)
  const [perfil, setPerfil] = useState<any>({ nombre: "", preferencias: "", estado_animo_actual: "" })

  const load = async () => {
    try {
      const data = await api.getPerfil()
      setPerfil({ nombre: data?.nombre ?? "", preferencias: data?.preferencias ?? "", estado_animo_actual: data?.estado_animo_actual ?? "" })
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo cargar el perfil' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onSave = async () => {
    try {
      await api.updatePerfil(perfil)
      Swal.fire({ icon: 'success', title: 'Guardado', text: 'Perfil actualizado' })
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e?.message || 'No se pudo actualizar' })
    }
  }

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Perfil</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm">Nombre</label>
              <Input value={perfil.nombre} onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })} />
            </div>
            <div>
              <label className="text-sm">Preferencias (JSON o texto)</label>
              <Input value={perfil.preferencias} onChange={(e) => setPerfil({ ...perfil, preferencias: e.target.value })} />
            </div>
            <div>
              <label className="text-sm">Estado de ánimo actual</label>
              <Input value={perfil.estado_animo_actual} onChange={(e) => setPerfil({ ...perfil, estado_animo_actual: e.target.value })} />
            </div>
            <Button onClick={onSave}>Guardar</Button>
          </div>
        )}
      </div>
    </RequireAuth>
  )
}