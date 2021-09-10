import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { getLogin, getLogout, updateTokens } from 'API/authApi'
import { IFetchingStatus } from 'constants/enums'
import {
  deleteAccessTokenFromCookie,
  getAccessTokenFromCookie,
  setAccessTokenToCookie,
} from 'utils/auth'
import { errorNotificate } from 'utils/errorNotificate'

export interface ICredentials {
  email: string
  password: string
}

export interface IAuthorizationState {
  entryLocation?: string
  loginCredentials?: ICredentials
  isAuthenticated: boolean
  fetchingStatus: IFetchingStatus
  logoutFetchingStatus: IFetchingStatus
  isTokenUpdated: boolean
}

const initialState: IAuthorizationState = {
  isAuthenticated: Boolean(getAccessTokenFromCookie()),
  fetchingStatus: IFetchingStatus.idle,
  logoutFetchingStatus: IFetchingStatus.idle,
  isTokenUpdated: false,
}

export const fetchLogin = createAsyncThunk(
  'fetchLogin',
  async (credentials: ICredentials, { rejectWithValue, dispatch }) => {
    try {
      const res = await getLogin(credentials)
      dispatch(clearLoginFormCredentials())
      return res
    } catch (error) {
      if (axios.isAxiosError(error)) errorNotificate(error)
      return rejectWithValue(error)
    }
  },
)

export const fetchLogout = createAsyncThunk('fetchLogout', async (_, { rejectWithValue }) => {
  try {
    return await getLogout()
  } catch (error) {
    if (axios.isAxiosError(error)) errorNotificate(error)
    return rejectWithValue(error)
  }
})

export const fetchUpdateTokens = createAsyncThunk(
  'fetchUpdateTokens',
  async (_, { rejectWithValue }) => {
    try {
      return await updateTokens()
    } catch (error) {
      if (axios.isAxiosError(error)) errorNotificate(error)
      return rejectWithValue(error)
    }
  },
)

const authorization = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setEntryLocation: (state, action) => {
      state.entryLocation = action.payload
    },
    clearEntryLocation: (state) => {
      state.entryLocation = undefined
    },
    setLoginFormCredentials: (state, action) => {
      state.loginCredentials = action.payload
    },
    clearLoginFormCredentials: (state) => {
      state.loginCredentials = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.fetchingStatus = IFetchingStatus.pending
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.fetchingStatus = IFetchingStatus.fulfilled
      const { access_token } = action.payload.data.tokens
      setAccessTokenToCookie(access_token)
      state.isAuthenticated = true
      state.isTokenUpdated = true
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.fetchingStatus = IFetchingStatus.rejected
    })
    builder.addCase(fetchLogout.fulfilled, (state) => {
      // TODO: добавить еще кейс для оффлайн логаута чтобы удалить токен если нет интернета
      // тут можно удалять все токены с бэка, а для оффлайн логаута удалять только на фронте
      deleteAccessTokenFromCookie()
      state.logoutFetchingStatus = IFetchingStatus.fulfilled
      state.isAuthenticated = false
    })
    // обновление токенов
    builder.addCase(fetchUpdateTokens.fulfilled, (state, action) => {
      const { access_token } = action.payload.data.tokens
      setAccessTokenToCookie(access_token)
      state.isTokenUpdated = true
    })
    builder.addCase(fetchUpdateTokens.rejected, (state) => {
      deleteAccessTokenFromCookie()
      state.isAuthenticated = false
    })
  },
})

const {
  reducer,
  actions: {
    setEntryLocation,
    clearEntryLocation,
    setLoginFormCredentials,
    clearLoginFormCredentials,
  },
} = authorization

export {
  reducer as authorization,
  setEntryLocation,
  clearEntryLocation,
  setLoginFormCredentials,
  clearLoginFormCredentials,
}
