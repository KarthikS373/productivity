import axios from "axios"

export const login = (user) => {
  return axios.post("/api/session", { user: user })
}

export const logout = () => {
  return axios.delete("/api/session")
}

export const signup = (user) => {
  return axios.post("/api/users", { user: user })
}
