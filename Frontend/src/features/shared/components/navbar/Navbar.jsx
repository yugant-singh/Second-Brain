import { useState } from "react"
import { NavLink } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar.jsx"
import "./Navbar.scss"

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <div className="navbar-logo">MindVault</div>
        </div>

        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
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

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar