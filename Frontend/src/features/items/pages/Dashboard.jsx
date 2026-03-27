import { useState, useEffect } from "react"
import Navbar from "../../shared/components/Navbar/Navbar.jsx"
import Sidebar from "../../shared/components/Sidebar/Sidebar.jsx"
import ItemCard from "../components/ItemCard/ItemCard.jsx"
import SaveItemModal from "../components/SaveItemModal/SaveItemModal.jsx"
import { useItems } from "../hooks/useItems.js"
import "./Dashboard.scss"

const Dashboard = () => {
  const { items, loading, saveItem, getResurfacedItems } = useItems()
  const [showModal, setShowModal] = useState(false)
  const [resurfaced, setResurfaced] = useState([])

  useEffect(() => {
    const fetchResurfaced = async () => {
      const result = await getResurfacedItems()
      if (result.data) setResurfaced(result.data)
    }
    fetchResurfaced()
  }, [])

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-main">

          <div className="dashboard-header">
            <h1>My Knowledge</h1>
            <button className="save-btn" onClick={() => setShowModal(true)}>
              + Save Item
            </button>
          </div>

          {resurfaced.length > 0 && (
            <div className="resurface-section">
              <div className="resurface-header">
                <span className="resurface-icon">🕰️</span>
                <h2>From Your Past</h2>
                <span className="resurface-subtitle">You saved these a while ago</span>
              </div>
              <div className="resurface-grid">
                {resurfaced.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          )}

          <div className="section-label">Recent Saves</div>

          {loading ? (
            <div className="dashboard-loading">Loading...</div>
          ) : items.length === 0 ? (
            <div className="dashboard-empty">
              <p>No items yet — save your first item! 🚀</p>
            </div>
          ) : (
            <div className="items-grid">
              {items.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          )}

        </main>
      </div>

      {showModal && (
        <SaveItemModal
          onClose={() => setShowModal(false)}
          onSave={saveItem}
        />
      )}
    </div>
  )
}

export default Dashboard