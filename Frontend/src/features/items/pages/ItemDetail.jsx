import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../../shared/components/navbar/Navbar.jsx"
import Sidebar from "../../shared/components/Sidebar/Sidebar.jsx"
import { useItems } from "../hooks/useItems.js"
import "./ItemDetail.scss"

const ItemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getItemById, deleteItem } = useItems()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItem = async () => {
      const result = await getItemById(id)
      if (result.data) {
        setItem(result.data)
      }
      setLoading(false)
    }
    fetchItem()
  }, [id])

  const handleDelete = async () => {
    await deleteItem(id)
    navigate("/dashboard")
  }

  if (loading) return (
    <div className="detail-page">
      <Navbar />
      <div className="detail-loading">Loading...</div>
    </div>
  )

  if (!item) return (
    <div className="detail-page">
      <Navbar />
      <div className="detail-loading">Item not found</div>
    </div>
  )

  return (
    <div className="detail-page">
      <Navbar />
      <div className="detail-body">
        <Sidebar />
        <main className="detail-main">

          <div className="detail-header">
            <button className="back-btn" onClick={() => navigate("/dashboard")}>
              ← Back
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>

          <div className="detail-card">
            <div className="detail-meta">
              <span className="detail-type">{item.type.toUpperCase()}</span>
              <span className="detail-date">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="detail-title">{item.title}</h1>

            {item.sourceUrl && (
              <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="detail-url">
                {item.sourceUrl}
              </a>
            )}

            {item.content && (
              <p className="detail-content">{item.content}</p>
            )}

            <div className="detail-section">
              <h3>AI Tags</h3>
              <div className="detail-tags">
                {item.tags.map((tag, i) => (
                  <span key={i} className="detail-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Topics</h3>
              <div className="detail-tags">
                {item.topics.map((topic, i) => (
                  <span key={i} className="detail-tag topic">{topic}</span>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default ItemDetail