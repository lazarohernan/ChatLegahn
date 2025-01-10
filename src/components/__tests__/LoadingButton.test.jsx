import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoadingButton from '../LoadingButton';

describe('LoadingButton', () => {
  const defaultProps = {
    children: 'Test Button',
    onClick: vi.fn(),
    className: 'test-class'
  };

  const renderButton = (props = {}) => {
    return render(
      <LoadingButton {...defaultProps} {...props} />
    );
  };

  it('renderiza correctamente en estado normal', () => {
    renderButton();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Button');
  });

  it('muestra el spinner cuando está cargando', () => {
    renderButton({ loading: true, loadingText: 'Cargando...' });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('se deshabilita cuando disabled es true', () => {
    renderButton({ disabled: true });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('llama al onClick cuando se hace click', () => {
    renderButton();
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('no llama al onClick cuando está deshabilitado', () => {
    renderButton({ disabled: true });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('no llama al onClick cuando está cargando', () => {
    renderButton({ loading: true });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('aplica clases adicionales correctamente', () => {
    renderButton();
    expect(screen.getByRole('button')).toHaveClass('test-class');
  });

  it('renderiza children cuando no está cargando', () => {
    renderButton({ children: <span>Custom Content</span> });
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('mantiene el tipo de botón especificado', () => {
    renderButton({ type: 'submit' });
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
