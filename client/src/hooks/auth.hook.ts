import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const login = useCallback((jwtToken, id, userEmail) => {
    setToken(jwtToken)
    setUserId(id)
    setEmail(userEmail)

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
        email: userEmail,
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken('')
    setUserId('')
    setEmail('')
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)!)

    if (data && data.token) {
      login(data.token, data.userId, data.email)
    }
  }, [login])

  return { login, logout, token, userId, email }
}
