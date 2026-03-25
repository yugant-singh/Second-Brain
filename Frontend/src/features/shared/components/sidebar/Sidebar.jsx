import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../auth/hooks/useAuth.js"
import { useCollections } from "../../../collections/hooks/useCollections.js"
import "./Sidebar.scss"

const Sidebar = () => {
  const { user, logoutHandler } = useAuth()
  const { collections } = useCollections()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutHandler()
    navigate("/login")
  }

  return (
    <aside className="sidebar">

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