import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorNotification from '../ErrorNotification';

describe('ErrorNotification', () => {
  const defaultProps = {
    message: 'Test error message',
    type: 'error',
    onClose: vi.fn(),
    autoClose: true,
    autoCloseTime: 2000
  };

  beforeEach(() => {
    vi.useFakeTimers();
    defaultProps.onClose.mockClear();
  });

  const renderWithProvider = (props = {}) => {
    return render(
      <ErrorNotification {...defaultProps} {...props} />
    );
  };

  it('renderiza el mensaje de error correctamente', () => {
    renderWithProvider();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('muestra el icono correcto según el tipo', () => {
    renderWithProvider();
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
  });

  it('llama a onClose cuando se hace click en el botón de cerrar', () => {
    renderWithProvider();
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('aplica las clases correctas según el tipo', () => {
    renderWithProvider();
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('bg-red-50');
    expect(notification.querySelector('svg')).toHaveClass('text-red-400');
  });

  it('se auto-cierra después del tiempo especificado', () => {
    renderWithProvider();
    vi.advanceTimersByTime(2000);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('no se auto-cierra si autoClose es false', () => {
    renderWithProvider({ autoClose: false });
    vi.advanceTimersByTime(5000);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('muestra un botón de acción si se proporciona', () => {
    const onAction = vi.fn();
    renderWithProvider({
      actionText: 'Reintentar',
      onAction
    });
    
    const actionButton = screen.getByText('Reintentar');
    fireEvent.click(actionButton);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('maneja múltiples notificaciones', () => {
    const { rerender } = renderWithProvider();
    expect(screen.getByText('Test error message')).toBeInTheDocument();

    rerender(
      <ErrorNotification
        {...defaultProps}
        message="Nuevo mensaje"
        type="warning"
      />
    );

    expect(screen.getByText('Nuevo mensaje')).toBeInTheDocument();
  });
});
