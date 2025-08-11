// frontend/app/(app)/layout.tsx
import { Navbar } from '@/components/ui/navbar';
import { Toaster } from "@/components/ui/sonner"; // Importa Toaster

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <Toaster richColors position="top-right" /> {/* Añade el Toaster aquí */}
    </>
  );
}