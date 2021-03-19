import { combineReducers } from 'redux'

import { store } from 'components/App/AppBehavior'
import app from './app'
import { authReducer } from './authorization'
import { regReducer } from './registration'

export const reducers = combineReducers({
  authorization: authReducer,
  registration: regReducer,
  app,
})

// export type RootState = ReturnType<typeof reducers>

export type RootState = ReturnType<typeof store.getState>
