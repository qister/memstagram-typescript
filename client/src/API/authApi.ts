import { axiosInstance } from './axios'

export interface IFetchLoginResult {
  tokens: { access_token: string }
}

export interface IAuthCredentials {
  email: string
  password: string
}

export const getLogin = (credentials: IAuthCredentials) =>
  axiosInstance.post<IFetchLoginResult>('/api/v1/auth/login', credentials)

export const getLogout = () => axiosInstance.delete('/api/v1/auth/logout')

interface IUpdateTokensResult {
  tokens: {
    access_token: string
  }
}

export const updateTokens = () =>
  axiosInstance.post<IUpdateTokensResult>('/api/v1/auth/refresh_tokens')
export interface IGetRegistrationResult {
  user: { email: string; nickname: string }
}

export interface IRegistrationCredentials {
  email: string
  password: string
  nickname?: string
}
export const getRegistration = (credentials: IRegistrationCredentials) =>
  axiosInstance.post<IGetRegistrationResult>('/api/v1/auth/registration', credentials)
