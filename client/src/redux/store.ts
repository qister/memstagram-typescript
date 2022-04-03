import { configureStore } from '@reduxjs/toolkit'

import { user } from 'pages/Profile/userSlice'
import { upload } from 'pages/AddMeme/uploadSlice'
import { authorization } from 'pages/Authorization/authSlice'
import { registration } from 'pages/Registration/registrationSlice'

export const createStore = () =>
  configureStore({
    reducer: {
      authorization,
      registration,
      user,
      upload,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

const rootStore = createStore()

export type RootState = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch
