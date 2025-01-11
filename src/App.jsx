import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ErrorProvider } from './context/ErrorContext';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationProvider } from './context/NavigationContext';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <ErrorProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <NavigationProvider>
              <AppRoutes />
            </NavigationProvider>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorProvider>
  );
}

export default App;
