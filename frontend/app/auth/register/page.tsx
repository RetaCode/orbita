"use client";

import { motion } from "framer-motion";
import RegisterForm from "@/components/auth/RegisterForm";
import { AnimatedWrapper } from "@/components/ui/AnimatedWrapper";
import Image from "next/image";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (data: any) => {
    console.log("Registering with:", data);
    // Aquí iría tu lógica de API para registrar al usuario
    await Swal.fire({
      icon: 'success',
      title: '¡Registro Exitoso!',
      text: 'Tu cuenta ha sido creada. Ahora, inicia sesión.',
    });
    router.push('/auth/login'); // Redirige a la página de login
  };

  return (
    <AnimatedWrapper>
      <div className="relative min-h-screen flex flex-col md:flex-row bg-[#F1F5F9] overflow-hidden">
        
        {/* --- COLUMNA IZQUIERDA (ANIMACIONES) --- */}
        <div className="relative hidden md:flex w-1/2 items-center justify-center bg-[#000020]">
          <Particles
            id="tsparticles"
            className="absolute inset-0 z-0"
            init={async (engine) => {
              await loadFull(engine);
            }}
            options={{
              fullScreen: { enable: false },
              background: { color: { value: "#000020" } },
              fpsLimit: 60,
              interactivity: { events: { onHover: { enable: false }, onClick: { enable: false }, resize: true } },
              particles: {
                color: { value: "#b2c3e0ff" },
                links: { color: "#60A5FA", distance: 150, enable: true, opacity: 0.3, width: 1 },
                move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 0.3 },
                number: { density: { enable: true, area: 800 }, value: 60 },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
              },
              detectRetina: true,
            }}
          />
          <motion.div
            className="absolute z-0 bottom-[650px] left-[-50px] w-80 h-80 bg-[#1E3A8A] rounded-full opacity-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
          <motion.div
            className="absolute z-10 bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#10B981] rotate-45 rounded-xl opacity-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
        </div>

        {/* --- COLUMNA DERECHA (FORMULARIO) --- */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="z-10 w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center p-12 bg-white shadow-xl relative"
        >
          <div className="flex justify-center mb-8">
            <Image src="/logo-orbita.png" alt="Logo de Órbita" width={120} height={120} className="rounded-full" />
          </div>
          
          {/* Usamos el formulario de registro avanzado que recuperaste */}
          <RegisterForm type="register" onSubmit={handleRegister} />
          
          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-[#3B82F6] hover:underline">
              Inicia sesión aquí
            </Link>
          </div>
        </motion.div>

      </div>
    </AnimatedWrapper>
  );
}