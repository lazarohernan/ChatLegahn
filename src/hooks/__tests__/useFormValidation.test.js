import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useFormValidation from '../useFormValidation';

describe('useFormValidation', () => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email inválido'
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
    }
  };

  let result;

  beforeEach(() => {
    const hook = renderHook(() => useFormValidation(initialValues, validationRules));
    result = hook.result;
  });

  it('inicia con valores por defecto', () => {
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isValid).toBe(false);
  });

  it('actualiza valores correctamente', () => {
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' }
      });
    });

    expect(result.current.values.email).toBe('test@example.com');
  });

  it('marca campo como tocado al perder foco', () => {
    act(() => {
      result.current.handleBlur({
        target: { name: 'email' }
      });
    });

    expect(result.current.touched.email).toBe(true);
  });

  it('valida email requerido', () => {
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: '' }
      });
      result.current.handleBlur({
        target: { name: 'email' }
      });
    });

    expect(result.current.errors.email).toBe('Este campo es requerido');
  });

  it('valida formato de email', () => {
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'invalid-email' }
      });
      result.current.handleBlur({
        target: { name: 'email' }
      });
    });

    expect(result.current.errors.email).toBe('Email inválido');
  });

  it('valida email correcto', () => {
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' }
      });
      result.current.handleBlur({
        target: { name: 'email' }
      });
    });

    expect(result.current.errors.email).toBeFalsy();
  });

  it('valida contraseña requerida', () => {
    act(() => {
      result.current.handleChange({
        target: { name: 'password', value: '' }
      });
      result.current.handleBlur({
        target: { name: 'password' }
      });
    });

    expect(result.current.errors.password).toBe('Este campo es requerido');
  });

  it('valida formato de contraseña', () => {
    act(() => {
      result.current.handleChange({
        target: { name: 'password', value: 'weak' }
      });
      result.current.handleBlur({
        target: { name: 'password' }
      });
    });

    expect(result.current.errors.password).toBe(
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
    );
  });

  it('valida contraseña correcta', () => {
    act(() => {
      result.current.handleChange({
        target: { name: 'password', value: 'Password1!' }
      });
      result.current.handleBlur({
        target: { name: 'password' }
      });
    });

    expect(result.current.errors.password).toBeFalsy();
  });

  it('valida que las contraseñas coincidan', () => {
    const hook = renderHook(() =>
      useFormValidation(
        { ...initialValues, confirmPassword: '' },
        {
          ...validationRules,
          confirmPassword: {
            required: true,
            match: 'password',
            message: 'Las contraseñas no coinciden'
          }
        }
      )
    );

    act(() => {
      hook.result.current.handleChange({
        target: { name: 'password', value: 'Password1!' }
      });
      hook.result.current.handleChange({
        target: { name: 'confirmPassword', value: 'Password2!' }
      });
      hook.result.current.handleBlur({
        target: { name: 'confirmPassword' }
      });
    });

    expect(hook.result.current.errors.confirmPassword).toBe('Las contraseñas no coinciden');
  });

  it('valida formulario completo correctamente', () => {
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' }
      });
      result.current.handleChange({
        target: { name: 'password', value: 'Password1!' }
      });
      result.current.handleBlur({
        target: { name: 'email' }
      });
      result.current.handleBlur({
        target: { name: 'password' }
      });
    });

    expect(result.current.isValid).toBe(true);
    expect(Object.keys(result.current.errors)).toHaveLength(0);
  });

  it('resetea el formulario correctamente', () => {
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' }
      });
      result.current.resetForm();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('maneja validación personalizada', () => {
    const hookWithCustomRules = renderHook(() =>
      useFormValidation(
        { age: '' },
        {
          age: {
            required: true,
            validate: (value) => parseInt(value) >= 18 || 'Debes ser mayor de edad'
          }
        }
      )
    );

    act(() => {
      hookWithCustomRules.result.current.handleChange({
        target: { name: 'age', value: '20' }
      });
      hookWithCustomRules.result.current.handleBlur({
        target: { name: 'age' }
      });
    });

    expect(hookWithCustomRules.result.current.errors.age).toBeFalsy();

    act(() => {
      hookWithCustomRules.result.current.handleChange({
        target: { name: 'age', value: '16' }
      });
      hookWithCustomRules.result.current.handleBlur({
        target: { name: 'age' }
      });
    });

    expect(hookWithCustomRules.result.current.errors.age).toBe('Debes ser mayor de edad');
  });
});
