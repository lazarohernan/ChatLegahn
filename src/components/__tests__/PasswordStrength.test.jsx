import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PasswordStrength from '../PasswordStrength';

describe('PasswordStrength', () => {
  const renderPasswordStrength = (password = '') => {
    return render(<PasswordStrength password={password} />);
  };

  it('muestra nivel débil para contraseñas cortas', () => {
    renderPasswordStrength('abc');
    const indicator = screen.getByTestId('password-strength-indicator');
    expect(indicator).toHaveStyle({ width: '20%' });
    expect(indicator).toHaveClass('bg-red-500');
    expect(screen.getByText(/débil/i)).toBeInTheDocument();
  });

  it('muestra nivel medio para contraseñas con algunos requisitos', () => {
    renderPasswordStrength('Password1');
    const indicator = screen.getByTestId('password-strength-indicator');
    expect(indicator).toHaveStyle({ width: '60%' });
    expect(indicator).toHaveClass('bg-yellow-500');
    expect(screen.getByText(/buena/i)).toBeInTheDocument();
  });

  it('muestra nivel fuerte para contraseñas que cumplen todos los requisitos', () => {
    renderPasswordStrength('Password1!');
    const indicator = screen.getByTestId('password-strength-indicator');
    expect(indicator).toHaveStyle({ width: '100%' });
    expect(indicator).toHaveClass('bg-green-600');
    expect(screen.getByText(/muy fuerte/i)).toBeInTheDocument();
  });

  it('muestra los requisitos de contraseña', () => {
    renderPasswordStrength('');
    expect(screen.getByText(/mínimo 8 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/al menos una mayúscula/i)).toBeInTheDocument();
    expect(screen.getByText(/al menos una minúscula/i)).toBeInTheDocument();
    expect(screen.getByText(/al menos un número/i)).toBeInTheDocument();
    expect(screen.getByText(/al menos un carácter especial/i)).toBeInTheDocument();
  });

  it('marca los requisitos cumplidos', () => {
    renderPasswordStrength('Password1!');
    const lengthCheck = screen.getByTestId('length-check');
    const uppercaseCheck = screen.getByTestId('uppercase-check');
    const lowercaseCheck = screen.getByTestId('lowercase-check');
    const numberCheck = screen.getByTestId('number-check');
    const specialCharCheck = screen.getByTestId('special-char-check');

    expect(lengthCheck).toHaveClass('text-green-600');
    expect(uppercaseCheck).toHaveClass('text-green-600');
    expect(lowercaseCheck).toHaveClass('text-green-600');
    expect(numberCheck).toHaveClass('text-green-600');
    expect(specialCharCheck).toHaveClass('text-green-600');
  });

  it('marca los requisitos no cumplidos', () => {
    renderPasswordStrength('weak');
    const lengthCheck = screen.getByTestId('length-check');
    const uppercaseCheck = screen.getByTestId('uppercase-check');
    const numberCheck = screen.getByTestId('number-check');
    const specialCharCheck = screen.getByTestId('special-char-check');

    expect(lengthCheck).not.toHaveClass('text-green-600');
    expect(uppercaseCheck).not.toHaveClass('text-green-600');
    expect(numberCheck).not.toHaveClass('text-green-600');
    expect(specialCharCheck).not.toHaveClass('text-green-600');
  });

  it('actualiza la barra de progreso según la fortaleza', () => {
    // Sin contraseña
    const { rerender } = renderPasswordStrength('');
    let indicator = screen.getByTestId('password-strength-indicator');
    expect(indicator).toHaveStyle({ width: '0%' });

    // Contraseña débil
    rerender(<PasswordStrength password="weak" />);
    indicator = screen.getByTestId('password-strength-indicator');
    expect(indicator).toHaveStyle({ width: '20%' });

    // Contraseña media
    rerender(<PasswordStrength password="Password1" />);
    indicator = screen.getByTestId('password-strength-indicator');
    expect(indicator).toHaveStyle({ width: '60%' });

    // Contraseña fuerte
    rerender(<PasswordStrength password="Password1!" />);
    indicator = screen.getByTestId('password-strength-indicator');
    expect(indicator).toHaveStyle({ width: '100%' });
  });

  it('verifica caracteres especiales correctamente', () => {
    // Sin caracteres especiales
    const { rerender } = renderPasswordStrength('Password1');
    const specialCharCheck = screen.getByTestId('special-char-check');
    expect(specialCharCheck).not.toHaveClass('text-green-600');

    // Con caracteres especiales
    rerender(<PasswordStrength password="Password1!" />);
    expect(screen.getByTestId('special-char-check')).toHaveClass('text-green-600');
  });

  it('verifica números correctamente', () => {
    // Sin números
    const { rerender } = renderPasswordStrength('Password!');
    const numberCheck = screen.getByTestId('number-check');
    expect(numberCheck).not.toHaveClass('text-green-600');

    // Con números
    rerender(<PasswordStrength password="Password1!" />);
    expect(screen.getByTestId('number-check')).toHaveClass('text-green-600');
  });

  it('verifica mayúsculas correctamente', () => {
    // Sin mayúsculas
    const { rerender } = renderPasswordStrength('password1!');
    const uppercaseCheck = screen.getByTestId('uppercase-check');
    expect(uppercaseCheck).not.toHaveClass('text-green-600');

    // Con mayúsculas
    rerender(<PasswordStrength password="Password1!" />);
    expect(screen.getByTestId('uppercase-check')).toHaveClass('text-green-600');
  });

  it('verifica minúsculas correctamente', () => {
    // Sin minúsculas
    const { rerender } = renderPasswordStrength('PASSWORD1!');
    const lowercaseCheck = screen.getByTestId('lowercase-check');
    expect(lowercaseCheck).not.toHaveClass('text-green-600');

    // Con minúsculas
    rerender(<PasswordStrength password="Password1!" />);
    expect(screen.getByTestId('lowercase-check')).toHaveClass('text-green-600');
  });
});
