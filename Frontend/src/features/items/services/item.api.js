import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
})

export const saveItemAPI = (data) => api.post("/items", data)
export const getItemsAPI = () => api.get("/items")
export const deleteItemAPI = (id) => api.delete(`/items/${id}`)
export const getItemByIdAPI = (id) => api.get(`/items/${id}`)