import { configureStore } from '@reduxjs/toolkit'

import { authorization } from 'pages/Authorization/authSlice'
import { registration } from 'pages/Registration/registrationSlice'

export const createStore = () =>
  configureStore({
    reducer: {
      authorization,
      registration,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

const rootStore = createStore()

export type RootState = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch
