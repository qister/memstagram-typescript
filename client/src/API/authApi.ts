import { ICredentials } from 'pages/Authorization/authSlice'
import { axiosInstance } from './axios'

interface IFetchLoginResult {
  tokens: { access_token: string }
}

export const getLogin = (credentials: ICredentials) =>
  axiosInstance.post<IFetchLoginResult>('/api/v1/auth/login', credentials)

export const getLogout = () => axiosInstance.delete('/api/v1/auth/logout')

interface IUpdateTokensResult {
  tokens: {
    access_token: string
  }
}

export const updateTokens = () =>
  axiosInstance.post<IUpdateTokensResult>('/api/v1/auth/refresh_tokens')
