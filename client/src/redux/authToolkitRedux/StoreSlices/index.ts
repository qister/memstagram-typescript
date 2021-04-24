import { combineReducers } from 'redux'

import { store } from 'components/App/AppBehavior'
import { registration } from './registration'
import { user } from 'pages/Profile/userSlice'
import { feed } from 'components/Feed/feedSlice'
import { upload } from 'pages/AddMeme/uploadSlice'
import { authorization } from 'pages/Authorization/authSlice'

export const reducers = combineReducers({
  authorization,
  registration,
  user,
  feed,
  upload,
})

// export type RootState = ReturnType<typeof reducers>

export type RootState = ReturnType<typeof store.getState>
