"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function DocumentacionPage() {
  const [docs, setDocs] = useState<any[]>([])

  useEffect(() => {
    api.getDocumentacion().then(setDocs).catch(() => setDocs([]))
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Documentación y recursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {docs.map((d) => (
          <article key={d.id_documento} className="border rounded p-4">
            <h2 className="font-medium">{d.titulo}</h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{d.contenido}</p>
            <p className="text-xs text-gray-500 mt-2">Categoría: {d.categoria} • Tip: {d.recomendacion}</p>
          </article>
        ))}
      </div>
    </div>
  )
}