import axios from 'axios'

import { ICredentials } from '../redux/authToolkitRedux/StoreSlices/authorization'
import { axiosInstance } from './axios'

interface IFetchLoginResult {
  tokens: { access_token: string }
}

export const getLogin = (credentials: ICredentials) =>
  axios.post<IFetchLoginResult>('/api/auth/login', credentials)

export const getLogout = () => axios.delete('/api/auth/logout')

interface IUpdateTokensResult {
  tokens: {
    access_token: string
  }
}

export const updateTokens = () =>
  axiosInstance.post<IUpdateTokensResult>('/api/auth/refresh_tokens')
