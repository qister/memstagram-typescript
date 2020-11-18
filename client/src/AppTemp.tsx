import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './redux/authToolkitRedux'
import App from './App'

const authStore = configureStore()

export function AppTemp() {
    return (
        <Provider store={authStore} >
            <App />
        </Provider>
    )
}