export type LoginResponse = {
  token: string
  usuario: any
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem('authToken')
  } catch {
    return null
  }
}

function authHeaders(extra?: HeadersInit): HeadersInit {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra || {}),
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const body = isJson ? await res.json().catch(() => ({})) : await res.text().catch(() => '')

  if (!res.ok) {
    const message = isJson ? (body?.error || body?.message) : body
    throw new Error(message || `Error ${res.status}`)
  }

  return body as T
}

export const api = {
  baseUrl: API_BASE_URL,

  async login(correo: string, contrasena: string): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena }),
    })
    return handleResponse<LoginResponse>(res)
  },

  async register(params: { correo: string; contrasena: string; nombre: string }): Promise<{ message: string; user_id?: number }> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    return handleResponse(res)
  },

  // Perfil
  async getPerfil(): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/perfil`, {
      headers: authHeaders(),
    })
    return handleResponse(res)
  },
  async updatePerfil(data: { nombre?: string; preferencias?: string; estado_animo_actual?: string }): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE_URL}/api/perfil`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    })
    return handleResponse(res)
  },

  // Tareas
  async getTareas(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/api/tareas`, { headers: authHeaders() })
    return handleResponse(res)
  },
  async createTarea(data: { titulo: string; descripcion?: string; fecha_vencimiento?: string; prioridad?: string; estado?: string; id_grupo?: number; id_plantilla?: number }): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/tareas`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    })
    return handleResponse(res)
  },
  async updateTarea(id: number, data: Partial<{ titulo: string; descripcion: string; fecha_vencimiento: string; prioridad: string; estado: string }>): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE_URL}/api/tareas/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    })
    return handleResponse(res)
  },

  // Grupos
  async getGrupos(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/api/grupos`, { headers: authHeaders() })
    return handleResponse(res)
  },
  async createGrupo(data: { nombre: string; descripcion?: string }): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/grupos`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    })
    return handleResponse(res)
  },
  async joinGrupo(id: number, rol_en_grupo = 'miembro'): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE_URL}/api/grupos/${id}/join`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ rol_en_grupo }),
    })
    return handleResponse(res)
  },

  // Eventos
  async getEventos(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/api/eventos`, { headers: authHeaders() })
    return handleResponse(res)
  },
  async createEvento(data: { titulo: string; descripcion?: string; fecha_hora_inicio: string; fecha_hora_fin?: string; tipo_evento?: string }): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/eventos`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    })
    return handleResponse(res)
  },

  // Estados de ánimo
  async getEstadosAnimo(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/api/estado-animo`, { headers: authHeaders() })
    return handleResponse(res)
  },
  async registrarEstadoAnimo(estado: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/estado-animo`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ estado }),
    })
    return handleResponse(res)
  },

  // Plantillas y documentación
  async getPlantillas(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/api/plantillas`)
    return handleResponse(res)
  },
  async getMisPlantillas(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/api/mis-plantillas`, { headers: authHeaders() })
    return handleResponse(res)
  },
  async seleccionarPlantilla(id: number, configuracion = ''): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE_URL}/api/plantillas/${id}/seleccionar`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ configuracion }),
    })
    return handleResponse(res)
  },
  async getDocumentacion(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/api/documentacion`)
    return handleResponse(res)
  },
}