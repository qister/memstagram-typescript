import { combineReducers } from 'redux'

import { user } from 'pages/Profile/userSlice'
import { feed } from 'pages/Feed/feedSlice'
import { upload } from 'pages/AddMeme/uploadSlice'
import { authorization } from 'pages/Authorization/authSlice'
import { registration } from 'pages/Registration/registrationSlice'

export const reducers = combineReducers({
  authorization,
  registration,
  user,
  feed,
  upload,
})
