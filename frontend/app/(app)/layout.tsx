import { Navbar } from '@/components/ui/navbar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* Este 'main' actúa como el contenedor principal con los márgenes */}
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </>
  );
}