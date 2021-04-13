import { combineReducers } from 'redux'

import { store } from 'components/App/AppBehavior'
import { app } from './app'
import { authorization } from './authorization'
import { registration } from './registration'

export const reducers = combineReducers({
  authorization,
  registration,
  app,
})

// export type RootState = ReturnType<typeof reducers>

export type RootState = ReturnType<typeof store.getState>
