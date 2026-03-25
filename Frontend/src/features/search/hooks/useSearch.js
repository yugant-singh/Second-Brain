import { useState } from "react"
import { searchItemsAPI } from "../services/search.api.js"

export function useSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const searchItems = async (query) => {
    try {
      setLoading(true)
      const res = await searchItemsAPI(query)
      setResults(res.data.results)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, searchItems }
}