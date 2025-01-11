import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Elemento root
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('No se encontró el elemento root')
}

// Crear root y renderizar
const root = createRoot(rootElement)

try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} catch (error) {
  console.error('Error al renderizar la aplicación:', error)
  root.render(
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Error al cargar la aplicación
        </h1>
        <p className="text-gray-600">
          Por favor, recarga la página o intenta más tarde.
        </p>
      </div>
    </div>
  )
}
