// frontend/app/(app)/layout.tsx
'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { Toaster } from "@/components/ui/sonner"; // Importa Toaster

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Protege toda la app bajo (app) si no hay token
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        router.replace('/auth/login');
      }
    } catch {
      router.replace('/auth/login');
    }
  }, [router, pathname]);

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