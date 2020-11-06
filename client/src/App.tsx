import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { MenuAppBar } from './components/MenuAppBar'


function App() {
  const { login, logout, token, userId, email } = useAuth()
  const isAuthenticated = !!token
  

  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isAuthenticated,
        email,
      }}
    >
      <Router>
        {isAuthenticated && <MenuAppBar/>}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
