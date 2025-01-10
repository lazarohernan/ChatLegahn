import PropTypes from 'prop-types';

const PasswordStrength = ({ password }) => {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const requirements = [
    { met: hasMinLength, text: 'Mínimo 8 caracteres', testId: 'length-check' },
    { met: hasUpperCase, text: 'Al menos una mayúscula', testId: 'uppercase-check' },
    { met: hasLowerCase, text: 'Al menos una minúscula', testId: 'lowercase-check' },
    { met: hasNumber, text: 'Al menos un número', testId: 'number-check' },
    { met: hasSpecialChar, text: 'Al menos un carácter especial', testId: 'special-char-check' }
  ];

  const metRequirements = requirements.filter(req => req.met).length;
  const strength = metRequirements / requirements.length;

  let strengthClass = 'bg-red-500';
  let strengthText = 'Muy débil';
  let progressWidth = '0%';

  if (password === '') {
    strengthClass = 'bg-gray-300';
    strengthText = 'Sin contraseña';
  } else if (strength === 1) {
    strengthClass = 'bg-green-600';
    strengthText = 'Muy fuerte';
    progressWidth = '100%';
  } else if (strength >= 0.7) {
    strengthClass = 'bg-green-500';
    strengthText = 'Fuerte';
    progressWidth = '80%';
  } else if (strength >= 0.4) {
    strengthClass = 'bg-yellow-500';
    strengthText = 'Buena';
    progressWidth = '60%';
  } else if (strength > 0) {
    strengthClass = 'bg-red-500';
    strengthText = 'Débil';
    progressWidth = '20%';
  }

  return (
    <div className="mt-1">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            data-testid="password-strength-indicator"
            className={`h-full ${strengthClass} transition-all duration-300`}
            style={{ width: progressWidth }}
          />
        </div>
        <span className={`text-xs font-medium ${strengthClass.replace('bg-', 'text-')}`}>
          {strengthText}
        </span>
      </div>
      <ul className="mt-2 text-xs text-gray-500 space-y-1">
        {requirements.map((req) => (
          <li
            key={req.testId}
            data-testid={req.testId}
            className={req.met ? 'text-green-600' : ''}
          >
            • {req.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

PasswordStrength.propTypes = {
  password: PropTypes.string.isRequired
};

export default PasswordStrength;
