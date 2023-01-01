import { combineReducers } from "redux"

import sessionReducer from "./session/session.reducers"

const rootReducer = combineReducers({
  session: sessionReducer,
})

export default rootReducer
