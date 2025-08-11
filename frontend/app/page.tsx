import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold text-[#1E3A8A]">Órbita</h1>
      <p className="text-gray-600">Productividad y bienestar personal</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/perfil" className="border rounded p-4 hover:shadow-sm transition">Perfil</Link>
        <Link href="/tareas" className="border rounded p-4 hover:shadow-sm transition">Tareas</Link>
        <Link href="/grupos" className="border rounded p-4 hover:shadow-sm transition">Grupos</Link>
        <Link href="/eventos" className="border rounded p-4 hover:shadow-sm transition">Eventos</Link>
        <Link href="/estados" className="border rounded p-4 hover:shadow-sm transition">Estados</Link>
        <Link href="/plantillas" className="border rounded p-4 hover:shadow-sm transition">Plantillas</Link>
        <Link href="/documentacion" className="border rounded p-4 hover:shadow-sm transition">Documentación</Link>
      </div>
    </div>
  );
}
