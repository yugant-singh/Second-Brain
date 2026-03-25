import { useNavigate } from "react-router-dom"
import "./ItemCard.scss"

const ItemCard = ({ item }) => {
  const navigate = useNavigate()

  return (
    <div className="item-card" onClick={() => navigate(`/item/${item._id}`)}>
      <div className="item-card-header">
        <span className="item-type">{item.type.toUpperCase()}</span>
        <span className="item-date">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>

      <h3 className="item-title">{item.title}</h3>

      {item.content && (
        <p className="item-content">{item.content.slice(0, 80)}...</p>
      )}

      <div className="item-tags">
        {item.tags.slice(0, 3).map((tag, i) => (
          <span key={i} className="item-tag">{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default ItemCard