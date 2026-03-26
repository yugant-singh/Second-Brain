import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../../auth/hooks/useAuth.js"
import { useCollections } from "../../../collections/hooks/useCollections.js"
import "./Sidebar.scss"

const Sidebar = ({ onClose = () => {} }) => {
  const { user, logoutHandler } = useAuth()
  const { collections, createCollection } = useCollections()
  const navigate = useNavigate()
  const [showInput, setShowInput] = useState(false)
  const [newColName, setNewColName] = useState("")

  const handleLogout = async () => {
    await logoutHandler()
    navigate("/login")
    onClose()
  }

  const handleCreateCollection = async (e) => {
    e.preventDefault()
    if (!newColName.trim()) return
    await createCollection({ name: newColName })
    setNewColName("")
    setShowInput(false)
  }

  return (
    <aside className="sidebar">

<nav className="sidebar-nav-mobile">
  <NavLink to="/" end onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
    Dashboard
  </NavLink>
  <NavLink to="/graph" onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
    Graph View
  </NavLink>
  <NavLink to="/search" onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
    Search
  </NavLink>
</nav>
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span className="sidebar-label">Collections</span>
          <button className="new-col-btn" onClick={() => setShowInput(!showInput)}>
            +
          </button>
        </div>

        {showInput && (
          <form onSubmit={handleCreateCollection} className="new-col-form">
            <input
              type="text"
              placeholder="Collection name..."
              value={newColName}
              onChange={(e) => setNewColName(e.target.value)}
              autoFocus
            />
            <button type="submit">Save</button>
          </form>
        )}

        {collections.length === 0 ? (
          <p className="sidebar-empty">No collections yet</p>
        ) : (
          collections.map((col) => (
            <NavLink
              to={`/collections/${col._id}`}
              key={col._id}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "sidebar-collection active" : "sidebar-collection"
              }
            >
              <span className="collection-dot" />
              {col.name}
            </NavLink>
          ))
        )}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-email">{user?.email}</span>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </aside>
  )
}

export default Sidebar