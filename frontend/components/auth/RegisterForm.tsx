'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Check, X, AlertTriangle } from 'lucide-react'

interface Props {
  type: 'login' | 'register'
  onSubmit: (data: any) => void
}

export default function AuthForm({ type, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apodo: '',
    preferencias: {
      tema: 'claro',
      notificaciones: true,
      idioma: 'es'
    }
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validación de contraseña
  const passwordValidation = useMemo(() => {
    const password = formData.password
    
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }

    const fulfilledCount = Object.values(requirements).filter(Boolean).length
    let strength = 'weak'
    let color = 'red'

    if (fulfilledCount === 5) {
      strength = 'strong'
      color = 'green'
    } else if (fulfilledCount >= 3) {
      strength = 'medium'
      color = 'yellow'
    }

    return {
      requirements,
      strength,
      color,
      isValid: fulfilledCount === 5
    }
  }, [formData.password])

  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (type === 'register' && (!passwordValidation.isValid || !passwordsMatch)) {
      return
    }
    
    if (type === 'login') {
      onSubmit({
        email: formData.email,
        password: formData.password
      })
    } else {
      onSubmit({
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        apodo: formData.apodo,
        preferencias: formData.preferencias
      })
    }
  }

  const RequirementItem = ({ met, text }: { met: boolean, text: string }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
        met ? 'text-green-600' : 'text-red-500'
      }`}
    >
      {met ? (
        <Check className="w-3 h-3 text-green-500" />
      ) : (
        <X className="w-3 h-3 text-red-400" />
      )}
      <span>{text}</span>
    </motion.div>
  )

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-[#1E3A8A]">
        {type === 'login' ? 'Iniciar Sesión' : 'Registro'}
      </h2>

      {/* Campos para registro */}
      {type === 'register' && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <Input
              placeholder="Tu nombre completo"
              value={formData.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              required
              className="border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">
              Apodo o nombre de usuario
            </label>
            <Input
              placeholder="Tu apodo favorito"
              value={formData.apodo}
              onChange={(e) => handleInputChange('apodo', e.target.value)}
              required
              className="border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6]"
            />
          </motion.div>
        </>
      )}

      {/* Campos comunes */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: type === 'register' ? 0.3 : 0.1 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <Input
          placeholder="tu@email.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          type="email"
          className="border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: type === 'register' ? 0.4 : 0.2 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <div className="relative">
          <Input
            placeholder="********"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            type={showPassword ? "text" : "password"}
            className={`border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6] pr-10 ${
              type === 'register' && formData.password.length > 0 
                ? passwordValidation.color === 'red' 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : passwordValidation.color === 'yellow'
                  ? 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-200'
                  : 'border-green-300 focus:border-green-500 focus:ring-green-200'
                : ''
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Indicador de fortaleza para registro */}
        {type === 'register' && formData.password.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {/* Barra de fortaleza */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(Object.values(passwordValidation.requirements).filter(Boolean).length / 5) * 100}%` 
                  }}
                  transition={{ duration: 0.3 }}
                  className={`h-full transition-colors duration-300 ${
                    passwordValidation.color === 'red' ? 'bg-red-400' :
                    passwordValidation.color === 'yellow' ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                />
              </div>
              <div className="flex items-center gap-1">
                {passwordValidation.color === 'red' && <X className="w-4 h-4 text-red-400" />}
                {passwordValidation.color === 'yellow' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                {passwordValidation.color === 'green' && <Check className="w-4 h-4 text-green-500" />}
                <span className={`text-xs font-medium ${
                  passwordValidation.color === 'red' ? 'text-red-500' :
                  passwordValidation.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {passwordValidation.strength === 'weak' ? 'Débil' :
                   passwordValidation.strength === 'medium' ? 'Media' : 'Fuerte'}
                </span>
              </div>
            </div>

            {/* Requisitos */}
            <div className="space-y-1 p-3 bg-gray-50 rounded-lg border">
              <p className="text-xs font-medium text-gray-700 mb-2">Requisitos de contraseña:</p>
              <RequirementItem 
                met={passwordValidation.requirements.length} 
                text="Mínimo 8 caracteres" 
              />
              <RequirementItem 
                met={passwordValidation.requirements.uppercase} 
                text="Una letra mayúscula" 
              />
              <RequirementItem 
                met={passwordValidation.requirements.lowercase} 
                text="Una letra minúscula" 
              />
              <RequirementItem 
                met={passwordValidation.requirements.number} 
                text="Un número" 
              />
              <RequirementItem 
                met={passwordValidation.requirements.special} 
                text="Un carácter especial" 
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Confirmar contraseña para registro */}
      {type === 'register' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700">
            Confirmar contraseña
          </label>
          <div className="relative">
            <Input
              placeholder="********"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
              type={showConfirmPassword ? "text" : "password"}
              className={`border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6] pr-10 ${
                formData.confirmPassword.length > 0 
                  ? passwordsMatch 
                    ? 'border-green-300 focus:border-green-500 focus:ring-green-200' 
                    : 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          {/* Indicador de coincidencia */}
          {formData.confirmPassword.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`flex items-center gap-2 text-xs ${
                passwordsMatch ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {passwordsMatch ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <X className="w-3 h-3 text-red-400" />
              )}
              <span>
                {passwordsMatch ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Preferencias predeterminadas para registro */}
      {type === 'register' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
        >
          <p className="text-xs text-blue-700 font-medium mb-2">
            Configuración inicial:
          </p>
          <div className="text-xs text-blue-600 space-y-1">
            <p>• Tema: Claro</p>
            <p>• Notificaciones: Activadas</p>
            <p>• Idioma: Español</p>
          </div>
          <p className="text-xs text-blue-500 mt-2">
            Podrás cambiar estas opciones más tarde en tu perfil.
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: type === 'register' ? 0.7 : 0.3 }}
      >
        <Button 
          type="submit" 
          disabled={type === 'register' && (!passwordValidation.isValid || !passwordsMatch)}
          className="w-full bg-[#3B82F6] hover:bg-[#1E3A8A] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#3B82F6]"
        >
          {type === 'login' ? 'Entrar' : 'Registrarse'}
        </Button>
      </motion.div>
    </motion.form>
  )
}