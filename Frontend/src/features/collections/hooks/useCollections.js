import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import {
  getCollectionsAPI,
  createCollectionAPI,
  deleteCollectionAPI,
  addItemToCollectionAPI,
} from "../services/collection.api.js"

export function useCollections() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      setLoading(true)
      const res = await getCollectionsAPI()
      setCollections(res.data.collections)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const createCollection = async (data) => {
    try {
      const res = await createCollectionAPI(data)
      setCollections((prev) => [res.data.collection, ...prev])
      toast.success("Collection created! 📁")
      return { success: true }
    } catch (err) {
      toast.error("Failed to create collection!")
      return { error: err.response?.data?.message || "Something went wrong" }
    }
  }

  const deleteCollection = async (id) => {
    try {
      await deleteCollectionAPI(id)
      setCollections((prev) => prev.filter((col) => col._id !== id))
      toast.success("Collection deleted!")
      return { success: true }
    } catch (err) {
      toast.error("Failed to delete collection!")
      return { error: err.response?.data?.message || "Something went wrong" }
    }
  }

  const addItemToCollection = async (collectionId, itemId) => {
    try {
      await addItemToCollectionAPI(collectionId, itemId)
      toast.success("Item added to collection! ✅")
      return { success: true }
    } catch (err) {
      toast.error("Failed to add item!")
      return { error: err.response?.data?.message || "Something went wrong" }
    }
  }

  return {
    collections,
    loading,
    createCollection,
    deleteCollection,
    addItemToCollection,
    fetchCollections,
  }
}