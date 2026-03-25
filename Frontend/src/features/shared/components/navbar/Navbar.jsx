import { NavLink } from "react-router-dom"
import "./Navbar.scss"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MindVault</div>

      <div className="navbar-links">
        <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Dashboard
        </NavLink>
        <NavLink to="/graph" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Graph View
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Search
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar