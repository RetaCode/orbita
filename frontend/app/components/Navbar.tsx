'use client'

import Link from 'next/link'
import { useAuth } from '@/app/lib/auth-context'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-semibold text-[#1E3A8A]">Órbita</Link>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/perfil">Perfil</Link>
          <Link href="/tareas">Tareas</Link>
          <Link href="/grupos">Grupos</Link>
          <Link href="/eventos">Eventos</Link>
          <Link href="/estados">Estados</Link>
          <Link href="/plantillas">Plantillas</Link>
          <Link href="/documentacion">Documentación</Link>
        </div>
        <div className="ml-auto">
          {isAuthenticated ? (
            <Button variant="outline" onClick={logout}>Salir</Button>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/login">Iniciar</Link>
              <Link href="/auth/register">Registro</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}