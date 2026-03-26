import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
})

export const searchItemsAPI = (query, type, sortBy) =>
  api.post("/search", { query, type, sortBy })