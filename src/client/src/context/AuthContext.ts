import { createContext } from 'react'

function noop() {}
function noopLogin(token: string, userId: string, email: string) {}

export const AuthContext = createContext({
  token: '',
  userId: '',
  email: '',
  login: noopLogin,
  logout: noop,
  isAuthenticated: false,
})
