export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('authToken');
  } catch {
    return null;
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'omit',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  // Try parse JSON, allow empty
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as T;
  }
  return undefined as unknown as T;
}

export const api = {
  login: async (email: string, password: string) => {
    // Backend espera { correo, contrasena }
    return apiFetch<{ token: string; usuario: any }>(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ correo: email, contrasena: password }),
    });
  },

  register: async (params: { correo: string; nombre: string; contrasena: string }) => {
    return apiFetch<{ message: string; user_id: number }>(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  getProfile: async () => {
    return apiFetch(`/api/perfil`, { method: 'GET' });
  },

  getTasks: async () => {
    return apiFetch(`/api/tareas`, { method: 'GET' });
  },

  getGroups: async () => {
    return apiFetch(`/api/grupos`, { method: 'GET' });
  },

  post: async <T>(path: string, body?: unknown) => {
    return apiFetch<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined });
  },
  get: async <T>(path: string) => apiFetch<T>(path, { method: 'GET' }),
  put: async <T>(path: string, body?: unknown) => {
    return apiFetch<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined });
  },
  delete: async <T>(path: string) => apiFetch<T>(path, { method: 'DELETE' }),
};