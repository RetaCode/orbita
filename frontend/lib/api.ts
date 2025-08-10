export type LoginResponse = {
  token: string
  usuario: any
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

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
}