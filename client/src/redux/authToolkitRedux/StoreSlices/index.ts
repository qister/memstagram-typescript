import { combineReducers } from 'redux'

import { store } from 'redux/authToolkitRedux'
import { registration } from './registration'
import { user } from 'components/Profile/userSlice'
import { feed } from 'components/Feed/feedSlice'
import { upload } from 'components/AddMeme/uploadSlice'
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
