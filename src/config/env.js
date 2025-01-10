const env = {
  development: {
    apiUrl: 'http://localhost:3000',
    enableLogs: true,
    csrfEnabled: true,
    authTokenExpiry: '1h',
    mockDelay: 1000, // ms
  },
  test: {
    apiUrl: 'http://localhost:3000',
    enableLogs: false,
    csrfEnabled: true,
    authTokenExpiry: '1h',
    mockDelay: 0,
  },
  production: {
    apiUrl: import.meta.env.VITE_API_URL,
    enableLogs: false,
    csrfEnabled: true,
    authTokenExpiry: '1h',
    mockDelay: 0,
  }
};

const getEnvConfig = () => {
  const environment = import.meta.env.MODE || 'development';
  return env[environment];
};

export const config = getEnvConfig();
export default config;
