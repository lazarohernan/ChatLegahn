import { createClient } from '@supabase/supabase-js';
import { logService } from './logService';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Crear cliente de Supabase con manejo de errores
const createSupabaseClient = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    logService.warn('Usando cliente mock de Supabase para desarrollo');
    return createMockClient();
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

// Cliente mock para desarrollo
const createMockClient = () => ({
  auth: {
    getSession: async () => null,
    onAuthStateChange: (callback) => {
      callback('INITIAL_SESSION', null);
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    },
    signOut: async () => ({ error: null }),
    signInWithPassword: async () => ({
      data: { user: null, session: null },
      error: null
    })
  }
});

const supabase = createSupabaseClient();

const supabaseService = {
  getSession: async () => {
    try {
      logService.debug('Obteniendo sesión');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      logService.debug('Sesión obtenida:', session);
      return session;
    } catch (error) {
      logService.error('Error al obtener sesión:', error);
      return null;
    }
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  signIn: async (credentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      return data;
    } catch (error) {
      logService.error('Error en signIn:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      logService.debug('Iniciando logout con Supabase');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      logService.error('Error en signOut:', error);
      throw error;
    }
  }
};

export default supabaseService;
