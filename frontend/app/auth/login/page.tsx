// frontend/app/(auth)/auth/login/page.tsx
"use client";

import { motion } from "framer-motion";
import AuthForm  from "@/components/auth/AuthForm";
import { AnimatedWrapper } from "@/components/ui/AnimatedWrapper";
import Image from "next/image";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
// import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('Login con:', email, password);
      // const data = await api.login(email, password);
      // localStorage.setItem("authToken", data.token);
      await Swal.fire({
        icon: 'success',
        title: '¡Sesión Iniciada!',
        text: 'Bienvenido de nuevo.',
        timer: 1500,
        showConfirmButton: false,
      });
      router.push('/home');
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Credenciales incorrectas.',
      });
    }
  };

  return (
    <AnimatedWrapper>
      <div className="relative min-h-screen flex flex-col md:flex-row bg-[#F1F5F9] overflow-hidden">
        {/* --- COLUMNA IZQUIERDA (FORMULARIO) --- */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="z-10 w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center p-12 bg-white shadow-xl relative"
        >
          <div className="flex justify-center mb-8">
            <Image src="/logo-orbita.png" alt="Logo de Órbita" width={160} height={160} className="rounded-full" />
          </div>
          <h2 className="text-5xl font-bold text-center text-[#1E3A8A] mb-4">
            Bienvenido a Órbita
          </h2>
          <AuthForm type="login" onSubmit={handleLogin} />
          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-3">O inicia sesión con:</p>
            <div className="flex justify-center gap-4">
              <button className="border px-4 py-2 rounded-md flex items-center gap-2 shadow hover:shadow-md transition">
                <Image src="/Google__G__logo.svg.webp" alt="Google" width={20} height={20} /> Google
              </button>
              <button className="border px-4 py-2 rounded-md flex items-center gap-2 shadow hover:shadow-md transition">
                <Image src="/Octicons-mark-github.svg.png" alt="GitHub" width={20} height={20} /> GitHub
              </button>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="text-[#3B82F6] hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </motion.div>

        {/* --- COLUMNA DERECHA (ANIMACIONES) --- ¡ESTA ES LA PARTE RESTAURADA! --- */}
        <div className="relative hidden md:flex w-1/2 items-center justify-center bg-[#000020]">
          <Particles
            id="tsparticles"
            className="absolute inset-0 z-0"
            init={async (engine) => {
              await loadFull(engine);
            }}
            options={{
              fullScreen: { enable: false }, // importante para que no ocupe toda la pantalla
              background: { color: { value: "#000020" } },
              fpsLimit: 60,
              interactivity: { events: { onHover: { enable: false }, onClick: { enable: false }, resize: true } },
              particles: {
                color: { value: "#b2c3e0ff" },
                links: { color: "#60A5FA", distance: 150, enable: true, opacity: 0.3, width: 1 },
                collisions: { enable: false },
                move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 0.3, straight: false },
                number: { density: { enable: true, area: 800 }, value: 60 },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
              },
              detectRetina: true,
            }}
          />

          {/* Figura 1: Círculo azul */}
          <motion.div
            className="absolute z-0 bottom-[650px] left-[-50px] w-80 h-80 bg-[#1E3A8A] rounded-full opacity-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
          {/* Figura 2: Cuadrado verde */}
          <motion.div
            className="absolute z-10 bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#10B981] rotate-45 rounded-xl opacity-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
        </div>
      </div>
    </AnimatedWrapper>
  );
}