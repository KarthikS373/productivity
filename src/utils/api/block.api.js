import axios from "axios"

export const createBlock = (block) => axios.post("/api/blocks", { block: block })

export const fetchBlocks = (userId) => axios.get(`api/users/${userId}/blocks`)

export const fetchBlock = (blockId) => axios.get(`api/blocks/${blockId}`)

export const updateBlock = (block) => axios.patch(`/api/blocks/${block.id}`, { block: block })

export const deleteBlock = (blockId) => axios.delete(`/api/blocks/${blockId}`)
