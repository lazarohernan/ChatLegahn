import { useState, useCallback } from 'react';

export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value) {
      return 'Este campo es requerido';
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Debe tener al menos ${rules.minLength} caracteres`;
    }

    if (rules.match && values[rules.match] !== value) {
      return rules.message;
    }

    if (rules.custom && !rules.custom(value)) {
      return rules.message;
    }

    return '';
  }, [validationRules, values]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values, validationRules]);

  const handleChange = useCallback(({ target: { name, value } }) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback(({ target: { name } }) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField, values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0 && 
                 Object.keys(touched).length === Object.keys(validationRules).length;

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  };
};
