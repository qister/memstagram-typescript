import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFetchingStatus } from 'constants/enums'

import { fetchLogin, logoutFetch } from '../../../API/authApi'

export interface ICredentials {
  email: string
  password: string
}

export interface IAuthorizationState {
  token: string
  userId: string
  email: string
  isAuthenticated: boolean
  fetchingStatus: IFetchingStatus
}

const initialState: IAuthorizationState = {
  token: '',
  userId: '',
  email: '',
  isAuthenticated: false,
  fetchingStatus: IFetchingStatus.idle,
}

export const authLogin = createAsyncThunk(
  'authLogin',
  (credentials: ICredentials) => {
    return fetchLogin(credentials)
  },
)

export const logout = createAsyncThunk('logout', () => logoutFetch())

const authorization = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login //
    builder.addCase(authLogin.pending, (state) => {
      state.fetchingStatus = IFetchingStatus.pending
    })
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.fetchingStatus = IFetchingStatus.fulfilled

      // TODO: через раз подтягивает токен из локалстоража при логине, поправить
      // localStorage.removeItem('accessToken')
      localStorage.setItem('accessToken', action.payload.accessToken)

      state.token = action.payload.token
      state.userId = action.payload.userId
      state.email = action.payload.email
      state.isAuthenticated = true
    })
    builder.addCase(authLogin.rejected, (state) => {
      state.fetchingStatus = IFetchingStatus.rejected
    })
  },
})

const { reducer } = authorization

export { reducer as authReducer }
