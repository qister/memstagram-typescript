import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFetchingStatus } from 'constants/enums'
import {
  deleteAccessTokenFromCookie,
  getAccessTokenFromCookie,
  setAccessTokenToCookie,
} from 'utils/auth'

import { getLogin, getLogout, updateTokens } from '../../../API/authApi'

export interface ICredentials {
  email: string
  password: string
}

export interface IAuthorizationState {
  isAuthenticated: boolean
  fetchingStatus: IFetchingStatus
}

const initialState: IAuthorizationState = {
  isAuthenticated: false,
  fetchingStatus: IFetchingStatus.idle,
}

export const fetchLogin = createAsyncThunk(
  'fetchLogin',
  (credentials: ICredentials) => {
    return getLogin(credentials)
  },
)

export const fetchLogout = createAsyncThunk('fetchLogout', getLogout)

export const fetchUpdateTokens = createAsyncThunk(
  'fetchUpdateTokens',
  updateTokens,
)

const authorization = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    initToken: (state) => {
      const token = getAccessTokenFromCookie()
      // TODO наверное надо добавить еще проверку на валидность, получение юзера сразу или обновление токена
      if (token) {
        state.isAuthenticated = true
      }
    },
  },
  extraReducers: (builder) => {
    // login //
    builder.addCase(fetchLogin.pending, (state) => {
      state.fetchingStatus = IFetchingStatus.pending
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.fetchingStatus = IFetchingStatus.fulfilled
      const { access_token } = action.payload.data.tokens
      setAccessTokenToCookie(access_token)
      state.isAuthenticated = true
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.fetchingStatus = IFetchingStatus.rejected
    })
    builder.addCase(fetchLogout.fulfilled, (state) => {
      // TODO: добавить еще кейс для оффлайн логаута чтобы удалить токен если нет интернета
      // тут можно удалять все токены с бэка, а для оффлайн логаута удалять только на фронте
      deleteAccessTokenFromCookie()
      state.fetchingStatus = IFetchingStatus.fulfilled
      state.isAuthenticated = false
    })
    // обновление токенов
    builder.addCase(fetchUpdateTokens.fulfilled, (state, action) => {
      const { access_token } = action.payload.data.tokens
      setAccessTokenToCookie(access_token)
      state.isAuthenticated = true
    })
    builder.addCase(fetchUpdateTokens.rejected, (state, action) => {
      // TODO настроить обработку ошибки
      state.isAuthenticated = false
    })
  },
})

const { reducer } = authorization

export { reducer as authReducer }
export const { initToken } = authorization.actions
