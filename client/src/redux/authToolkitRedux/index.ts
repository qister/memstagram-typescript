import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducers } from './StoreSlices'

export const configureStore = () => {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]

  const composedEnhancers = composeWithDevTools(...enhancers)

  return createStore(reducers, {}, composedEnhancers)
}

export const store = configureStore()
