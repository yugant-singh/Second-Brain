import axios from "axios"

const api = axios.create({
  baseURL: "https://second-brain-ps3j.onrender.com/api",
  withCredentials: true,
})

export const searchItemsAPI = (query, type, sortBy) =>
  api.post("/search", { query, type, sortBy })