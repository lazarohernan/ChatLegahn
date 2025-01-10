import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner', () => {
  const renderSpinner = (props = {}) => {
    return render(<Spinner {...props} />);
  };

  it('renderiza correctamente con props por defecto', () => {
    renderSpinner();
    const spinnerIcon = screen.getByTestId('spinner-icon');
    expect(spinnerIcon).toBeInTheDocument();
    expect(spinnerIcon).toHaveClass('animate-spin');
    expect(spinnerIcon).toHaveClass('text-primary-600');
  });

  it('aplica el tamaño correcto', () => {
    renderSpinner({ size: 'lg' });
    const spinnerIcon = screen.getByTestId('spinner-icon');
    expect(spinnerIcon).toHaveClass('w-8');
    expect(spinnerIcon).toHaveClass('h-8');
  });

  it('aplica el color personalizado', () => {
    renderSpinner({ color: 'text-red-500' });
    const spinnerIcon = screen.getByTestId('spinner-icon');
    expect(spinnerIcon).toHaveClass('text-red-500');
  });

  it('aplica clases adicionales', () => {
    renderSpinner({ className: 'my-custom-class' });
    const spinnerContainer = screen.getByTestId('spinner');
    expect(spinnerContainer).toHaveClass('my-custom-class');
  });

  it('maneja diferentes tamaños', () => {
    // Tamaño pequeño
    const { rerender } = renderSpinner({ size: 'sm' });
    let spinnerIcon = screen.getByTestId('spinner-icon');
    expect(spinnerIcon).toHaveClass('w-4', 'h-4');

    // Tamaño mediano (default)
    rerender(<Spinner size="md" />);
    spinnerIcon = screen.getByTestId('spinner-icon');
    expect(spinnerIcon).toHaveClass('w-6', 'h-6');

    // Tamaño grande
    rerender(<Spinner size="lg" />);
    spinnerIcon = screen.getByTestId('spinner-icon');
    expect(spinnerIcon).toHaveClass('w-8', 'h-8');
  });

  it('mantiene la accesibilidad', () => {
    renderSpinner();
    const spinnerContainer = screen.getByTestId('spinner');
    expect(spinnerContainer).toHaveAttribute('role', 'status');
    expect(screen.getByText('Cargando...')).toHaveClass('sr-only');
  });

  it('permite texto de carga personalizado', () => {
    renderSpinner({ loadingText: 'Procesando...' });
    expect(screen.getByText('Procesando...')).toHaveClass('sr-only');
  });

  it('centra el spinner cuando center es true', () => {
    renderSpinner({ center: true });
    const spinnerContainer = screen.getByTestId('spinner');
    expect(spinnerContainer).toHaveClass('justify-center');
  });

  it('aplica el margen correcto', () => {
    renderSpinner({ margin: 'mt-4' });
    const spinnerContainer = screen.getByTestId('spinner');
    expect(spinnerContainer).toHaveClass('mt-4');
  });

  it('maneja la visibilidad', () => {
    const { rerender } = renderSpinner({ visible: false });
    expect(screen.getByTestId('spinner')).toHaveClass('hidden');

    rerender(<Spinner visible={true} />);
    expect(screen.getByTestId('spinner')).not.toHaveClass('hidden');
  });
});
