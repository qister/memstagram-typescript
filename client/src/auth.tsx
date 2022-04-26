import axios, { type AxiosResponse } from 'axios'
import { createContext, type FC, useContext, useState } from 'react'
import { type UseMutateFunction, useMutation, useQuery } from 'react-query'

import {
  getLogin,
  getLogout,
  IFetchLoginResult,
  updateTokens,
  getRegistration,
  IGetRegistrationResult,
  IRegistrationCredentials,
  IAuthCredentials,
} from 'API/authApi'

import {
  deleteAccessTokenFromCookie,
  getAccessTokenFromCookie,
  setAccessTokenToCookie,
} from 'utils/auth'
import { errorNotificate } from 'utils/errorNotificate'

const hasAccessTokenInCookie = Boolean(getAccessTokenFromCookie())

const AuthContext = createContext<{
  isAuthenticated: boolean
  isTokenUpdating: boolean
  logout: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>
  login: UseMutateFunction<AxiosResponse<IFetchLoginResult>, unknown, IAuthCredentials, unknown>
  isLoggingIn: boolean
  register: UseMutateFunction<
    AxiosResponse<IGetRegistrationResult>,
    unknown,
    IRegistrationCredentials,
    unknown
  >
  isRegistering: boolean
  justRegistered: boolean
  initialCredentials: IAuthCredentials | undefined
  setInitialCredentials: React.Dispatch<React.SetStateAction<IAuthCredentials | undefined>>
}>({
  isAuthenticated: false,
  isTokenUpdating: false,
  logout: () => {},
  login: () => {},
  isLoggingIn: false,
  register: () => {},
  isRegistering: false,
  justRegistered: false,
  initialCredentials: undefined,
  setInitialCredentials: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const tokenUpdatePeriod = 10 * 60 * 1000 // 10 минут

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAccessTokenInCookie)
  const [initialCredentials, setInitialCredentials] = useState<IAuthCredentials>()

  const { mutate: login, isLoading: isLoggingIn } = useMutation(getLogin, {
    onSuccess: ({
      data: {
        tokens: { access_token },
      },
    }) => {
      setAccessTokenToCookie(access_token)
      setIsAuthenticated(true)
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) errorNotificate(error)
      setIsAuthenticated(false)
    },
  })

  const {
    mutate: register,
    isLoading: isRegistering,
    isSuccess: justRegistered,
  } = useMutation(getRegistration, {})

  const { mutate: logout } = useMutation(getLogout, {
    onSuccess: () => {
      setIsAuthenticated(false)
      deleteAccessTokenFromCookie()
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) errorNotificate(error)
      deleteAccessTokenFromCookie()
      setIsAuthenticated(false)
    },
  })

  const { isLoading: isTokenUpdating } = useQuery('refresh_tokens', updateTokens, {
    enabled: hasAccessTokenInCookie,
    onError: (error) => {
      if (axios.isAxiosError(error)) errorNotificate(error)
      setIsAuthenticated(false)
      deleteAccessTokenFromCookie()
    },
    refetchInterval: tokenUpdatePeriod,
  })

  const value = {
    isAuthenticated,
    isTokenUpdating,
    logout,
    login,
    isLoggingIn,
    register,
    isRegistering,
    justRegistered,
    initialCredentials,
    setInitialCredentials,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
