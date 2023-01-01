import * as SessionAPI from "../../../utils/api/session.api"
import {
  LOGOUT_CURRENT_USER,
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS,
  REMOVE_ERRORS,
} from "./session.contants"

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
})

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
})

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
})

export const removeErrors = () => ({
  type: REMOVE_ERRORS,
})

export const signup = (user) => (dispatch) =>
  SessionAPI.signup(user)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)))

export const login = (user) => (dispatch) =>
  SessionAPI.login(user)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)))

export const logout = () => (dispatch) =>
  SessionAPI.logout()
    .then((user) => dispatch(logoutCurrentUser()))
    .catch((errors) => dispatch(receiveErrors(errors.responseJSON)))
