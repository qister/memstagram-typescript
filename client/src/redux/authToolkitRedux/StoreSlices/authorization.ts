import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFetchingStatus } from 'constants/enums'
import {
  deleteAccessTokenFromCookie,
  getAccessTokenFromCookie,
  setAccessTokenToCookie,
} from 'utils/auth'

import { fetchLogin, fetchLogout } from '../../../API/authApi'

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

export const logout = createAsyncThunk('logout', fetchLogout)

const authorization = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    initToken: (state) => {
      const token = getAccessTokenFromCookie()
      // TODO наверное надо добавить еще получение юзера сразу или обновление токена
      if (token) {
        state.isAuthenticated = true
      }
    },
  },
  extraReducers: (builder) => {
    // login //
    builder.addCase(authLogin.pending, (state) => {
      state.fetchingStatus = IFetchingStatus.pending
    })
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.fetchingStatus = IFetchingStatus.fulfilled
      const token = action.payload.tokens.access_token
      setAccessTokenToCookie(token)
      // TODO: сделать получение юзера по токену
      state.isAuthenticated = true
    })
    builder.addCase(authLogin.rejected, (state) => {
      state.fetchingStatus = IFetchingStatus.rejected
    })
    builder.addCase(logout.fulfilled, (state) => {
      // TODO: добавить еще кейс для оффлайн логаута чтобы удалить токен если нет интернета
      // тут можно удалять все токены с бэка, а для оффлайн логаута удалять только на фронте
      deleteAccessTokenFromCookie()
      state.fetchingStatus = IFetchingStatus.fulfilled
      state.isAuthenticated = false
    })
  },
})

const { reducer } = authorization

export { reducer as authReducer }
export const { initToken } = authorization.actions
