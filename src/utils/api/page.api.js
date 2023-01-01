import axios from "axios"

export const createPage = (page) => axios.post(`/api/pages`, { page: page })

export const fetchPages = (userId) => axios.get(`api/pages${userId}`)

export const fetchPage = (pageId) => axios.get(`api/page/${pageId}`)

export const updatePage = (page) => axios.patch(`/api/pages/${page.id}`, { page: page })

export const deletePage = (pageId) => axios.delete(`/api/pages/${pageId}`)
