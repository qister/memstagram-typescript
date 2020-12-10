import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducers } from './StoreSlices'
import logger from './middleware/logger'
import monitorReducerEnhancer from './enhancers/monitorReducer'

export function configureStore() {
  const middlewares = [
    // logger,
    thunkMiddleware,
  ]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [
    middlewareEnhancer,
    // monitorReducerEnhancer
  ]

  const composedEnhancers = composeWithDevTools(...enhancers)

  return createStore(reducers, {}, composedEnhancers)
}
