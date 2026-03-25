import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../../auth/hooks/useAuth"
import "./Navbar.scss"

const Navbar = () => {
  const { user, logoutHandler } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutHandler()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">MindVault</Link>

      <div className="navbar-right">
        <span className="navbar-user">👤 {user?.name}</span>
        <button className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar