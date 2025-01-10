import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Tiempo mínimo entre navegaciones (en ms)
const NAVIGATION_THROTTLE = 300;
const AUTH_PATHS = ['/login', '/dashboard', '/admin'];

let lastNavigationTime = 0;

export const useNavigationThrottle = () => {
  const location = useLocation();

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastNavigation = now - lastNavigationTime;
    const isAuthNavigation = AUTH_PATHS.some(path => location.pathname.startsWith(path));

    // No aplicar throttling a navegaciones de autenticación
    if (isAuthNavigation) {
      lastNavigationTime = now;
      return;
    }

    if (timeSinceLastNavigation < NAVIGATION_THROTTLE) {
      const delay = NAVIGATION_THROTTLE - timeSinceLastNavigation;
      setTimeout(() => {
        lastNavigationTime = now + delay;
      }, delay);
    } else {
      lastNavigationTime = now;
    }
  }, [location]);
};
