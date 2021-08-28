import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { reducers } from './StoreSlices'

export const configureStore = () => {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  return createStore(reducers, {}, middlewareEnhancer)
}

export const store = configureStore()
