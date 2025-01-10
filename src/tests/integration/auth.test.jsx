import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { ErrorProvider } from '../../context/ErrorContext';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import authService from '../../services/authService';

vi.mock('../../services/authService', () => ({
  default: {
    login: vi.fn(),
    register: vi.fn(),
    getCurrentUser: vi.fn()
  }
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ErrorProvider>
        <AuthProvider>
          {component}
        </AuthProvider>
      </ErrorProvider>
    </BrowserRouter>
  );
};

describe('Flujo de Autenticación', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Login', () => {
    it('muestra errores de validación cuando los campos están vacíos', async () => {
      renderWithProviders(<Login />);
      
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/el correo electrónico es requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/la contraseña es requerida/i)).toBeInTheDocument();
      });
    });

    it('maneja el inicio de sesión exitoso', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      };

      authService.login.mockResolvedValueOnce({
        user: mockUser,
        token: 'mock-token'
      });

      renderWithProviders(<Login />);

      const emailInput = screen.getByLabelText(/correo electrónico/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith(
          'test@example.com',
          'password123',
          expect.any(String)
        );
      });
    });
  });

  describe('Register', () => {
    it('valida que las contraseñas coincidan', async () => {
      renderWithProviders(<Register />);

      const nameInput = screen.getByLabelText(/nombre completo/i);
      const emailInput = screen.getByLabelText(/correo electrónico/i);
      const passwordInput = screen.getByLabelText(/^contraseña$/i);
      const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
      const termsCheckbox = screen.getByLabelText(/acepto los términos/i);
      const submitButton = screen.getByRole('button', { name: /crear cuenta/i });

      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'Password124!' } });
      fireEvent.click(termsCheckbox);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
      });
    });

    it('maneja el registro exitoso', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      };

      authService.register.mockResolvedValueOnce({
        user: mockUser,
        token: 'mock-token'
      });

      renderWithProviders(<Register />);

      const nameInput = screen.getByLabelText(/nombre completo/i);
      const emailInput = screen.getByLabelText(/correo electrónico/i);
      const passwordInput = screen.getByLabelText(/^contraseña$/i);
      const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
      const termsCheckbox = screen.getByLabelText(/acepto los términos/i);
      const submitButton = screen.getByRole('button', { name: /crear cuenta/i });

      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
      fireEvent.click(termsCheckbox);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(authService.register).toHaveBeenCalledWith({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123!'
        });
      });
    });
  });
});
