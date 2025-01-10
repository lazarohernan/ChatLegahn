import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useAuth from '../useAuth';
import authService from '../../services/authService';
import sessionService from '../../services/sessionService';

vi.mock('../../services/authService');
vi.mock('../../services/sessionService');

describe('useAuth', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user'
  };

  const mockToken = 'mock-token';

  beforeEach(() => {
    vi.clearAllMocks();
    sessionService.getToken.mockReturnValue(null);
    sessionService.validateSession.mockResolvedValue({ valid: true });
  });

  it('inicia sin usuario autenticado', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('maneja el inicio de sesión exitoso', async () => {
    authService.login.mockResolvedValue({ user: mockUser, token: mockToken });
    sessionService.setToken.mockImplementation(() => {});

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(sessionService.setToken).toHaveBeenCalledWith(mockToken);
  });

  it('maneja errores de inicio de sesión', async () => {
    const errorMessage = 'Credenciales inválidas';
    authService.login.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      try {
        await result.current.login('test@example.com', 'wrong-password');
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('maneja el registro exitoso', async () => {
    authService.register.mockResolvedValue({ user: mockUser, token: mockToken });
    sessionService.setToken.mockImplementation(() => {});

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!'
      });
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(sessionService.setToken).toHaveBeenCalledWith(mockToken);
  });

  it('maneja errores de registro', async () => {
    const errorMessage = 'El email ya está registrado';
    authService.register.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      try {
        await result.current.register({
          name: 'Test User',
          email: 'existing@example.com',
          password: 'Password123!'
        });
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('maneja el cierre de sesión', async () => {
    authService.login.mockResolvedValue({ user: mockUser, token: mockToken });
    sessionService.setToken.mockImplementation(() => {});
    sessionService.removeToken.mockImplementation(() => {});

    const { result } = renderHook(() => useAuth());

    // Primero iniciamos sesión
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.isAuthenticated).toBe(true);

    // Luego cerramos sesión
    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(sessionService.removeToken).toHaveBeenCalled();
  });

  it('restaura la sesión desde el token', async () => {
    sessionService.getToken.mockReturnValue(mockToken);
    authService.getCurrentUser.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.restoreSession();
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('maneja errores de restauración de sesión', async () => {
    sessionService.getToken.mockReturnValue(mockToken);
    authService.getCurrentUser.mockRejectedValue(new Error('Token inválido'));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.restoreSession();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(sessionService.removeToken).toHaveBeenCalled();
  });

  it('valida la sesión periódicamente', async () => {
    vi.useFakeTimers();
    sessionService.getToken.mockReturnValue(mockToken);
    authService.getCurrentUser.mockResolvedValue(mockUser);

    renderHook(() => useAuth());

    // Avanzamos el tiempo para que se ejecute la validación
    await act(async () => {
      vi.advanceTimersByTime(5 * 60 * 1000); // 5 minutos
    });

    expect(sessionService.validateSession).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('maneja la expiración de sesión', async () => {
    vi.useFakeTimers();
    sessionService.getToken.mockReturnValue(mockToken);
    sessionService.validateSession.mockResolvedValue({ valid: false });
    authService.getCurrentUser.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth());

    // Primero iniciamos sesión
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    // Avanzamos el tiempo para que se ejecute la validación
    await act(async () => {
      vi.advanceTimersByTime(5 * 60 * 1000); // 5 minutos
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(sessionService.removeToken).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
