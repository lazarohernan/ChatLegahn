import { createClient } from '@supabase/supabase-js'
import { logService } from './logService'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const isDevelopment = import.meta.env.MODE === 'development'

// Mock data para desarrollo
const mockUser = {
  id: 'mock-user-id',
  email: 'mock@example.com',
  user_metadata: {
    name: 'Usuario Mock',
    role: 'user'
  },
  app_metadata: {
    provider: 'email'
  },
  aud: 'authenticated',
  created_at: new Date().toISOString()
}

const mockSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  user: mockUser
}

// Cliente mock para desarrollo
const mockClient = {
  auth: {
    signUp: async ({ email, options = {} }) => ({
      data: {
        user: {
          ...mockUser,
          email,
          user_metadata: { ...mockUser.user_metadata, ...options.data }
        },
        session: mockSession
      },
      error: null
    }),
    signInWithPassword: async ({ email }) => ({
      data: {
        user: { ...mockUser, email },
        session: mockSession
      },
      error: null
    }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({
      data: { session: mockSession },
      error: null
    }),
    refreshSession: async () => ({
      data: { session: mockSession },
      error: null
    }),
    onAuthStateChange: (callback) => {
      callback('SIGNED_IN', { session: mockSession })
      return { data: { subscription: { unsubscribe: () => {} } } }
    },
    resetPasswordForEmail: async (email) => {
      logService.debug('Mock: Reset password email sent to', email)
      return { error: null }
    },
    updateUser: async (updates) => ({
      data: { user: { ...mockUser, ...updates } },
      error: null
    }),
    verifyOtp: async ({ token }) => {
      if (token === 'invalid') {
        return { error: { message: 'Invalid token' } }
      }
      return { data: { user: mockUser }, error: null }
    }
  }
}

// Crear cliente real o mock según el entorno
export const supabase = (() => {
  if (!isDevelopment && (!supabaseUrl || !supabaseAnonKey)) {
    logService.warn('Usando cliente mock de Supabase temporalmente en producción debido a credenciales faltantes')
    return mockClient
  }
  
  if (supabaseUrl && supabaseAnonKey) {
    return createClient(supabaseUrl, supabaseAnonKey)
  }
  
  logService.warn('Usando cliente mock de Supabase para desarrollo')
  return mockClient
})()

export const supabaseService = {
  // Autenticación
  async signUp({ email, password, metadata = {} }) {
    try {
      logService.debug('Iniciando registro con Supabase')
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
      })
      if (error) throw error
      logService.debug('Registro exitoso:', { userId: data.user?.id })
      return data
    } catch (error) {
      logService.error('Error en signUp:', error)
      throw error
    }
  },

  async signIn({ email, password }) {
    try {
      logService.debug('Iniciando login con Supabase')
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      logService.debug('Login exitoso:', { userId: data.user?.id })
      return data
    } catch (error) {
      logService.error('Error en signIn:', error)
      throw error
    }
  },

  async signOut() {
    try {
      logService.debug('Iniciando logout con Supabase')
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      logService.debug('Logout exitoso')
    } catch (error) {
      logService.error('Error en signOut:', error)
      throw error
    }
  },

  async resetPassword(email) {
    try {
      logService.debug('Solicitando reset de password')
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (error) throw error
      logService.debug('Solicitud de reset enviada')
    } catch (error) {
      logService.error('Error en resetPassword:', error)
      throw error
    }
  },

  async updatePassword(newPassword) {
    try {
      logService.debug('Actualizando password')
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
      logService.debug('Password actualizado')
    } catch (error) {
      logService.error('Error en updatePassword:', error)
      throw error
    }
  },

  // Sesión
  async getSession() {
    try {
      logService.debug('Obteniendo sesión')
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      logService.debug('Sesión obtenida:', { userId: session?.user?.id })
      return session
    } catch (error) {
      logService.error('Error en getSession:', error)
      throw error
    }
  },

  async refreshSession() {
    try {
      logService.debug('Refrescando sesión')
      const { data: { session }, error } = await supabase.auth.refreshSession()
      if (error) throw error
      logService.debug('Sesión refrescada:', { userId: session?.user?.id })
      return session
    } catch (error) {
      logService.error('Error en refreshSession:', error)
      throw error
    }
  },

  // OAuth
  async signInWithProvider(provider) {
    try {
      logService.debug('Iniciando login con proveedor:', provider)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
      logService.debug('Login con proveedor iniciado')
      return data
    } catch (error) {
      logService.error('Error en signInWithProvider:', error)
      throw error
    }
  },

  // Utilidades
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

export default supabaseService
