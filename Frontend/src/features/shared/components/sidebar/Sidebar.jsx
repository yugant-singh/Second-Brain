import { NavLink } from "react-router-dom"
import "./Sidebar.scss"

const Sidebar = ({ collections = [] }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="nav-icon">⊞</span>
          Dashboard
        </NavLink>

        <NavLink to="/graph" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="nav-icon">◎</span>
          Graph View
        </NavLink>

        <NavLink to="/search" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span className="nav-icon">⊙</span>
          Search
        </NavLink>
      </nav>

      <div className="sidebar-section">
        <span className="sidebar-label">Collections</span>
        {collections.length === 0 ? (
          <p className="sidebar-empty">No collections yet</p>
        ) : (
          collections.map((col) => (
            <div key={col._id} className="sidebar-collection">
              <span className="collection-dot" />
              {col.name}
            </div>
          ))
        )}
      </div>
    </aside>
  )
}

export default Sidebar