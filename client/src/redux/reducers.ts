import { combineReducers } from 'redux'

import { user } from 'components/Profile/userSlice'
import { feed } from 'components/Feed/feedSlice'
import { upload } from 'components/AddMeme/uploadSlice'
import { authorization } from 'pages/Authorization/authSlice'
import { registration } from 'pages/Registration/registrationSlice'

export const reducers = combineReducers({
  authorization,
  registration,
  user,
  feed,
  upload,
})
