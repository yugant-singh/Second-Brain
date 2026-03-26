import { useState } from "react"
import Navbar from "../../shared/components/Navbar/Navbar.jsx"
import Sidebar from "../../shared/components/Sidebar/Sidebar.jsx"
import ItemCard from "../../items/components/ItemCard/ItemCard.jsx"
import { useSearch } from "../hooks/useSearch.js"
import "./SearchPage.scss"

const SearchPage = () => {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const { results, loading, searchItems } = useSearch()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      searchItems(query, type, sortBy)
    }
  }

  const handleTypeChange = (newType) => {
    setType(newType)
    if (query.trim()) {
      searchItems(query, newType, sortBy)
    }
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
    if (query.trim()) {
      searchItems(query, type, newSort)
    }
  }

  return (
    <div className="search-page">
      <Navbar />
      <div className="search-body">
        <Sidebar />
        <main className="search-main">

          <div className="search-header">
            <h1>Search</h1>
            <p>Search your entire knowledge universe</p>
          </div>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search by meaning — AI understands context..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          <div className="search-filters">
            <div className="filter-group">
              <span className="filter-label">Type:</span>
              {["all", "url", "text", "image", "pdf"].map((t) => (
                <button
                  key={t}
                  className={type === t ? "filter-btn active" : "filter-btn"}
                  onClick={() => handleTypeChange(t)}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="filter-group">
              <span className="filter-label">Sort:</span>
              <button
                className={sortBy === "relevance" ? "filter-btn active" : "filter-btn"}
                onClick={() => handleSortChange("relevance")}
              >
                Relevance
              </button>
              <button
                className={sortBy === "date" ? "filter-btn active" : "filter-btn"}
                onClick={() => handleSortChange("date")}
              >
                Latest
              </button>
            </div>
          </div>

          {results.length > 0 && (
            <div className="search-results">
              <p className="results-count">{results.length} results found</p>
              <div className="results-grid">
                {results.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          )}

          {!loading && results.length === 0 && query && (
            <div className="search-empty">
              No results found — try different keywords 🔍
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default SearchPage