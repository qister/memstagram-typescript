import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducers, history } from './StoreSlices'
import { routerMiddleware } from 'connected-react-router'

export const configureStore = () => {
  const routerMiddlewaree = routerMiddleware(history)

  const middlewares = [thunkMiddleware, routerMiddlewaree]

  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]

  const composedEnhancers = composeWithDevTools(...enhancers)

  return createStore(reducers(history), {}, composedEnhancers)
}

export const store = configureStore()
