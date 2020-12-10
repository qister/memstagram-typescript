import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '../../redux/authToolkitRedux'
import App from './App'

const store = configureStore()

export function AppTemp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
