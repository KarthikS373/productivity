import axios from "axios"

export const login = (user) => {
  return axios.post("/api/auth/session", { user: user })
}

export const logout = () => {
  return axios.delete("/api/auth/session")
}

export const signup = (user) => {
  return axios.post("/api/auth/signup", { user: user })
}
