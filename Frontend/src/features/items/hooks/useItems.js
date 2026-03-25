import { useState, useEffect } from "react"
import { saveItemAPI, getItemsAPI, deleteItemAPI ,getItemByIdAPI} from "../services/item.api.js"

export function useItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const res = await getItemsAPI()
      setItems(res.data.items)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const saveItem = async (data) => {
    try {
      const res = await saveItemAPI(data)
      setItems((prev) => [res.data.item, ...prev])
      return { success: true }
    } catch (err) {
      return { error: err.response?.data?.message || "Something went wrong" }
    }
  }

  const deleteItem = async (id) => {
    try {
      await deleteItemAPI(id)
      setItems((prev) => prev.filter((item) => item._id !== id))
      return { success: true }
    } catch (err) {
      return { error: err.response?.data?.message || "Something went wrong" }
    }
  }
  const getItemById = async (id) => {
  try {
    const res = await getItemByIdAPI(id)
    return { data: res.data.item }
  } catch (err) {
    return { error: err.response?.data?.message || "Something went wrong" }
  }
}

  return { items, loading, saveItem, deleteItem, fetchItems,getItemById }
}