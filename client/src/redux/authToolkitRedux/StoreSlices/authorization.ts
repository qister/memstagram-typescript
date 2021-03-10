import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { authLoginFetch, logoutFetch } from '../../../API/authApi'

export interface Credentials {
  email: string
  password: string
}

export enum IFetchingStatus {
  idle = 'idle',
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

export interface AuthorizationState {
  token: string
  userId: string
  email: string
  isAuthenticated: boolean
  fetchingStatus: IFetchingStatus
}

const initialState: AuthorizationState = {
  token: '',
  userId: '',
  email: '',
  isAuthenticated: false,
  fetchingStatus: IFetchingStatus.idle,
}

export const authLogin = createAsyncThunk(
  'authLogin',
  (credentials: Credentials) => {
    return authLoginFetch(credentials)
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

export default authorization.reducer
