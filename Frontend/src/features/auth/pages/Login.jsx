import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import "./LoginPage.scss"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { loginHandler } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await loginHandler({ email, password })

    if (result) {
      setError(result)
    } else {
      navigate("/dashboard")
    }
    setIsLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="stars">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }} />
        ))}
      </div>

      <div className="auth-card">
        <div className="auth-logo">MindVault</div>
        <p className="auth-subtitle">Your Knowledge Universe</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
         Don't  have an account? <Link to="/register">Register </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage