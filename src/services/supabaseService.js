import { createClient } from '@supabase/supabase-js'
import { logService } from './logService'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// En desarrollo, permitir que el servicio se inicialice sin credenciales
const isDevelopment = import.meta.env.MODE === 'development'

if (!supabaseUrl || !supabaseAnonKey) {
  if (!isDevelopment) {
    throw new Error('Supabase URL and Anon Key are required in production')
  }
  logService.warn('Supabase credentials not found, running in mock mode')
}

// Crear cliente de Supabase o un mock en desarrollo
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : isDevelopment
    ? {
        auth: {
          signUp: async () => ({ data: { user: { id: 'mock-user-id', email: 'mock@example.com' } }, error: null }),
          signInWithPassword: async () => ({ data: { user: { id: 'mock-user-id', email: 'mock@example.com' } }, error: null }),
          signOut: async () => ({ error: null }),
          getSession: async () => ({ data: { session: null }, error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
          resetPasswordForEmail: async () => ({ error: null }),
          verifyOtp: async () => ({ error: null })
        }
      }
    : null

export const supabaseService = {
  // Autenticación
  async signUp({ email, password, metadata = {} }) {
    try {
      logService.debug('Iniciando registro con Supabase')
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
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
        password,
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
        redirectTo: `${window.location.origin}/reset-password`,
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
        password: newPassword,
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
          redirectTo: `${window.location.origin}/auth/callback`,
        },
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
  },
}

export default supabaseService
