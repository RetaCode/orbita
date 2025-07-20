"use client";

import { motion } from "framer-motion";
import ExpandedRegisterForm from "@/app/components/ExpandedRegisterForm";
import { AnimatedWrapper } from "@/app/components/AnimatedWrapper";
import Image from "next/image";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


export default function RegisterPage() {
  return (
    <AnimatedWrapper>
      <div className="relative min-h-screen flex flex-col md:flex-row bg-[#F1F5F9] overflow-hidden">
        {/* Parte izquierda con partículas y decoraciones */}
        <div className="relative hidden md:flex w-1/2 items-center justify-center bg-[#000020]">
          <Particles
            id="tsparticles-register"
            className="absolute inset-0 z-0"
            init={async (engine) => {
              await loadFull(engine);
            }}
            options={{
              fullScreen: false,
              background: { color: { value: "#000020" } },
              fpsLimit: 60,
              interactivity: {
                events: { onHover: { enable: false }, onClick: { enable: false }, resize: true },
              },
              particles: {
                color: { value: "#b2c3e0ff" },
                links: {
                  color: "#60A5FA",
                  distance: 150,
                  enable: true,
                  opacity: 0.3,
                  width: 1,
                },
                collisions: { enable: false },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "bounce" },
                  random: true,
                  speed: 0.3,
                  straight: false,
                },
                number: {
                  density: { enable: true, area: 800 },
                  value: 60,
                },
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

          {/* Líneas tipo órbita */}
          <motion.svg
            className="absolute z-0 w-[150%] h-[80vh] -rotate-12 bottom-[0%] left-[-25%]"
            viewBox="0 0 800 400"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="20%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="70%" stopColor="#3B82F6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="fadeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
                <stop offset="20%" stopColor="#60A5FA" stopOpacity="0.2" />
                <stop offset="70%" stopColor="#60A5FA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              d="M 0 300 Q 300 50 800 200"
              stroke="url(#fadeGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: [0, 0.4, 0.4, 0], pathOffset: [0, 0, 0.6, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", times: [0, 0.4, 0.7, 1] }}
            />
            <motion.path
              d="M 0 320 Q 300 70 800 220"
              stroke="url(#fadeGradient2)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: [0, 0.4, 0.4, 0], pathOffset: [0, 0, 0.6, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 0.5, times: [0, 0.4, 0.7, 1] }}
            />
            <motion.path
              d="M 0 300 Q 300 50 800 200"
              stroke="#10B981"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathLength: [0, 0.3, 0.3, 0],
                pathOffset: [0, 0, 0.7, 1],
                stroke: ["#10B981", "#60A5FA", "#3B82F6", "#10B981"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1, times: [0, 0.3, 0.8, 1] }}
            />
          </motion.svg>
        </div>

        {/* Parte derecha con el formulario de registro */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="z-10 w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center p-12 bg-white shadow-xl relative"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#60A5FA]"
          />
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-orbita.png"
              alt="Logo de Órbita"
              width={180}
              height={180}
              className="rounded-full"
            />
          </div>
          <h2 className="text-5xl font-bold text-center text-[#1E3A8A] mb-4">
            Crea tu cuenta en Órbita
          </h2>
          <div className="w-full max-w-xl">
            <ExpandedRegisterForm
              type="register"
              onSubmit={() => {
                import('sweetalert2').then((Swal) => {
                  Swal.default.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'Tu cuenta fue creada correctamente.',
                    confirmButtonColor: '#1E3A8A',
                  })
                })
              }}
            />
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-3">O Registrate con:</p>
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
            ¿Ya tienes una cuenta?{" "}
            <a href="/auth/login" className="text-[#3B82F6] hover:underline">
              Inicia sesión aquí
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatedWrapper>
  );
}
