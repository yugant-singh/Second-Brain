import axios from "axios"

const api = axios.create({
  baseURL: "https://second-brain-ps3j.onrender.com/api",
  withCredentials: true,
})

export const getCollectionsAPI = () => api.get("/collections")
export const createCollectionAPI = (data) => api.post("/collections", data)
export const deleteCollectionAPI = (id) => api.delete(`/collections/${id}`)
export const addItemToCollectionAPI = (collectionId, itemId) => 
  api.post(`/collections/${collectionId}/add-item`, { itemId })