import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { Toaster } from 'react-hot-toast'
import '../src/features/shared/styles/global.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(4, 4, 15, 0.95)',
            color: '#e2e8f0',
            border: '1px solid rgba(0, 212, 255, 0.15)',
            borderRadius: '8px',
            fontSize: '13px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#04040f',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff6b6b',
              secondary: '#04040f',
            },
          },
        }}
      />
      <App />
    </AuthProvider>
  </StrictMode>
)