import { combineReducers } from 'redux'

import authorization from './authorization'
import app from './app'

import { store } from 'components/App/AppBehavior'

export const reducers = combineReducers({
  authorization,
  app,
})

// export type RootState = ReturnType<typeof reducers>

export type RootState = ReturnType<typeof store.getState>
