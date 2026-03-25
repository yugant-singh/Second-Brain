import { useContext } from 'react'
import { register, login, getMe, logout } from '../services/auth.api.js'
import { AuthContext } from '../auth.context.jsx'



export function useAuth() {
    const context = useContext(AuthContext)
    const { user, loading, setLoading, setUser } = context

    const registerHandler = async ({ name, email, password }) => {

        try {
            setLoading(true)
            const data = await register({ name, email, password })

            setUser(data.user)
        }
        catch (error) {
            return error.response?.data?.message || "Something went wrong"
        }
        finally {
            setLoading(false)
        }
    }

    const loginHandler = async ({ email, password }) => {
        try {
            setLoading(true)
            const data = await login({ email, password })
            setUser(data.user)
        }
        catch (error) {
            return error.response?.data?.message || "Something went wrong"
        }
        finally {
            setLoading(false)
        }

    }

    const logoutHandler = async () => {
        try {
            setLoading(true)
            const data = await logout()
            setUser(data.user)
        }
        catch (error) {
            return error.response?.data?.message || "Something went wrong"
        }
        finally {
            setLoading(false)
        }


    }

    return { registerHandler, loginHandler, logoutHandler, loading, user }

}