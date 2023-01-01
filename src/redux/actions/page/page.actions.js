import * as pagesAPI from "../../../utils/api/page.api"

import {
  RECEIVE_PAGE,
  RECEIVE_PAGES,
  RECEIVE_PAGE_ERRORS,
  REMOVE_ERRORS,
  REMOVE_PAGE,
} from "./page.constants"

export const receivePages = (pages) => ({
  type: RECEIVE_PAGES,
  pages,
})

export const receivePage = (page) => ({
  type: RECEIVE_PAGE,
  page,
})

export const removePage = (pageId) => ({
  type: REMOVE_PAGE,
  pageId,
})

export const receiveErrors = (errors) => ({
  type: RECEIVE_PAGE_ERRORS,
  errors,
})

export const removeErrors = () => ({
  type: REMOVE_ERRORS,
})

export const fetchPages = (userId) => (dispatch) =>
  pagesAPI
    .fetchPages(userId)
    .then((pages) => dispatch(receivePages(pages)))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)))

export const createPage = (page) => (dispatch) =>
  pagesAPI
    .createPage(page)
    .then((page) => dispatch(receivePage(page)))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)))
