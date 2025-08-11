// frontend/components/ui/navbar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, LayoutDashboard, Settings, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import { api } from '@/lib/api';

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/tasks', label: 'Tareas' },
  { href: '/calendar', label: 'Calendario' },
  { href: '/groups', label: 'Grupos' },
  { href: '/timer', label: 'Focus Timer' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light'); 
  const [name, setName] = useState('Usuario');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://github.com/shadcn.png');

  useEffect(() => {
    (async () => {
      try {
        const profile: any = await api.getProfile();
        if (profile?.nombre) setName(profile.nombre);
        if (profile?.correo) setEmail(profile.correo);
        if (profile?.avatar) setAvatarUrl(profile.avatar);
      } catch {
        // ignore
      }
    })();
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const handleLogout = () => {
    try {
      localStorage.removeItem('authToken');
    } catch {}
    router.replace('/auth/login');
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/home" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2V6M12 18V22M22 12H18M6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16.9497 7.05025L14.1213 9.87868M9.87868 14.1213L7.05025 16.9497" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="font-bold text-lg">Órbita</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  {
                    'text-muted-foreground hover:text-foreground': !isActive,
                    'text-foreground': isActive,
                  }
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-link"
                    className="absolute inset-0 bg-muted rounded-full"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <img
                src={avatarUrl}
                alt="Avatar del usuario"
                className="h-8 w-8 rounded-full border-2 border-border"
              />
            </motion.button>

            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-popover text-popover-foreground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="p-2">
                    <div className="border-b border-border pb-2 mb-2">
                      <p className="font-semibold text-sm">{name}</p>
                      <p className="text-xs text-muted-foreground">{email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md hover:bg-muted">
                      <User className="h-4 w-4" /> Perfil
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md hover:bg-muted">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md hover:bg-muted">
                      <Settings className="h-4 w-4" /> Configuración
                    </Link>
                    <div className="border-t border-border pt-2 mt-2">
                      <button onClick={handleLogout} className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md hover:bg-muted text-destructive">
                        <LogOut className="h-4 w-4" /> Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;