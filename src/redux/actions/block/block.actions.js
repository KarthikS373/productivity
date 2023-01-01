import * as blockAPI from "../../../utils/api/block.api"

import {
  RECEIVE_BLOCKS,
  RECEIVE_BLOCK,
  RECEIVE_BLOCK_ERRORS,
  REMOVE_BLOCK,
  REMOVE_ERRORS,
} from "./block.constants"

export const receiveBlocks = (blocks) => ({
  type: RECEIVE_BLOCKS,
  blocks,
})

export const receiveBlock = (block) => ({
  type: RECEIVE_BLOCK,
  block,
})

export const removeBlock = (blockId) => ({
  type: REMOVE_BLOCK,
  blockId,
})

export const receiveErrors = (errors) => ({
  type: RECEIVE_BLOCK_ERRORS,
  errors,
})

export const removeErrors = () => ({
  type: REMOVE_ERRORS,
})

export const fetchBlocks = (userId) => (dispatch) =>
  blockAPI
    .fetchBlocks(userId)
    .then((blocks) => dispatch(receiveBlocks(blocks)))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)))

export const createBlock = (block) => (dispatch) =>
  blockAPI
    .createBlock(block)
    .then((block) => dispatch(receiveBlock(block)))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)))

export const fetchBlock = (blockId) => (dispatch) =>
  blockAPI
    .fetchBlock(blockId)
    .then((block) => dispatch(receiveBlock(block)))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)))

export const updateBlock = (block) => (dispatch) =>
  blockAPI
    .updateBlock(block)
    .then((block) => dispatch(receiveBlock(block)))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)))

export const deleteBlock = (blockId) => (dispatch) =>
  blockAPI
    .deleteBlock(blockId)
    .then(() => dispatch(removeBlock(blockId)))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)))
