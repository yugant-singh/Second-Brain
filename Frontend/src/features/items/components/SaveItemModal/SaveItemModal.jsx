import { useState } from "react"
import "./SaveItemModal.scss"

const SaveItemModal = ({ onClose, onSave }) => {
  const [type, setType] = useState("url")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [sourceUrl, setSourceUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await onSave({ type, title, content, sourceUrl })

    if (result?.error) {
      setError(result.error)
    } else {
      onClose()
    }
    setIsLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Save Item</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="modal-error">{error}</div>}

          <div className="form-group">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="url">URL</option>
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Item ka title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              placeholder="Content ya description..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Source URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default SaveItemModal