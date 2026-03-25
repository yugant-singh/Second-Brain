import { createContext, useState, useEffect } from "react"
import { getMe } from './services/auth.api.js'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hydrateUser = async () => {
      try {
        const data = await getMe()
        setUser(data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    hydrateUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}