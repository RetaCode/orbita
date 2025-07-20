'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface Props {
  type: 'login' | 'register'
  onSubmit: (email: string, password: string) => void
}

export default function AuthForm({ type, onSubmit }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(email, password)
      }}
      className="space-y-4 w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">
        {type === 'login' ? 'Iniciar Sesión' : 'Registro'}
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Correo</label>
        <Input
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Contraseña</label>
        <Input
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
      </div>

      <Button type="submit" className="w-full">
        {type === 'login' ? 'Entrar' : 'Registrarse'}
      </Button>
    </motion.form>
  )
}
