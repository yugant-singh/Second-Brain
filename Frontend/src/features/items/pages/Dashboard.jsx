import { useState } from "react"
import Navbar from "../../shared/components/navbar/Navbar.jsx"
import Sidebar from "../../shared/components/Sidebar/Sidebar.jsx"
import ItemCard from "../components/ItemCard/ItemCard.jsx"
import SaveItemModal from "../components/SaveItemModal/SaveItemModal.jsx"
import { useItems } from "../hooks/useItems.js"
import "./Dashboard.scss"

const Dashboard = () => {
  const { items, loading, saveItem } = useItems()
  const [showModal, setShowModal] = useState(false)

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

          {loading ? (
            <div className="dashboard-loading">Loading...</div>
          ) : items.length === 0 ? (
            <div className="dashboard-empty">
              <p>Koi item nahi hai abhi — pehla item save karo! 🚀</p>
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