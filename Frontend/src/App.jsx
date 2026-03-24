import React from 'react'
import AppRoutes from './routes.jsx'
import {AuthProvider} from '../src/features/auth/auth.context.jsx'

const App = () => {
  return (
   <AuthProvider>
    <AppRoutes/>
   </AuthProvider>
  )
}

export default App