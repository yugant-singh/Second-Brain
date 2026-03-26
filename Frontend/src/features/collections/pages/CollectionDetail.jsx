import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../../shared/components/navbar/Navbar.jsx"
import Sidebar from "../../shared/components/Sidebar/Sidebar.jsx"
import ItemCard from "../../items/components/ItemCard/ItemCard.jsx"
import { useCollections } from "../hooks/useCollections.js"
import { getItemsAPI } from "../../items/services/item.api.js"
import "./CollectionDetail.scss"

const CollectionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { collections, deleteCollection } = useCollections()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const collection = collections.find((col) => col._id === id)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getItemsAPI()
        const filtered = res.data.items.filter(
          (item) => item.collectionId === id
        )
        setItems(filtered)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [id])

  const handleDelete = async () => {
    await deleteCollection(id)
    navigate("/")
  }

  return (
    <div className="col-detail-page">
      <Navbar />
      <div className="col-detail-body">
        <Sidebar />
        <main className="col-detail-main">

          <div className="col-detail-header">
            <div>
              <button className="back-btn" onClick={() => navigate("/")}>
                ← Back
              </button>
            </div>
            <button className="delete-btn" onClick={handleDelete}>
              Delete Collection
            </button>
          </div>

          <div className="col-detail-title">
            <h1>{collection?.name || "Collection"}</h1>
            <span>{items.length} items</span>
          </div>

          {loading ? (
            <div className="col-loading">Loading...</div>
          ) : items.length === 0 ? (
            <div className="col-empty">
              Is collection mein koi item nahi — ItemDetail pe jaake add karo! 📁
            </div>
          ) : (
            <div className="col-items-grid">
              {items.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default CollectionDetail