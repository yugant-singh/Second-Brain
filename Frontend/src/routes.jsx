import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./features/auth/hooks/useAuth.js"

import LoginPage from "./features/auth/pages/Login.jsx"
import RegisterPage from "./features/auth/pages/Register.jsx"
import Dashboard from "./features/items/pages/Dashboard.jsx"
import ItemDetail from "./features/items/pages/ItemDetail.jsx"
import GraphPage from "./features/graph/pages/GraphPage.jsx"
import SearchPage from "./features/search/pages/SearchPage.jsx"
import CollectionDetail from "./features/collections/pages/CollectionDetail.jsx"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  return user ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/item/:id" element={<ProtectedRoute><ItemDetail /></ProtectedRoute>} />
        <Route path="/graph" element={<ProtectedRoute><GraphPage /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
        <Route path="/collections/:id" element={<ProtectedRoute><CollectionDetail /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes