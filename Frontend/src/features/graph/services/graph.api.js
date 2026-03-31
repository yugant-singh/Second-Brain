import axios from "axios"

const api = axios.create({
  baseURL: "https://second-brain-ps3j.onrender.com/api",
  withCredentials: true,
})

export const getGraphDataAPI = () => api.get("/graph")