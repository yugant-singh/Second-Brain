import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../shared/components/Navbar/Navbar.jsx"
import Sidebar from "../../shared/components/Sidebar/Sidebar.jsx"
import ItemCard from "../../items/components/ItemCard/ItemCard.jsx"
import { useSearch } from "../hooks/useSearch.js"
import "./SearchPage.scss"

const SearchPage = () => {
  const [query, setQuery] = useState("")
  const { results, loading, searchItems } = useSearch()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      searchItems(query)
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
            <p>Apni knowledge universe mein kuch bhi dhundo</p>
          </div>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Kuch bhi likho — AI meaning samjhega..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {results.length > 0 && (
            <div className="search-results">
              <p className="results-count">{results.length} results mile</p>
              <div className="results-grid">
                {results.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          )}

          {!loading && results.length === 0 && query && (
            <div className="search-empty">
              Koi result nahi mila — kuch aur try karo 🔍
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default SearchPage