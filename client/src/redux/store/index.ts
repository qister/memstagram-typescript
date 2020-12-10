import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from '../reducers'
import logger from 'redux-logger'

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION__?: any
//   }
// }

export const configureStore = () =>
  createStore(
    rootReducer,
    // compose(
    //   applyMiddleware(logger, thunk),
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
  )
