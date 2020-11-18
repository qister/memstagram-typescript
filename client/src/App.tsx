import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { MenuAppBar } from './components/MenuAppBar'
import { useSelector } from 'react-redux'
import { RootState } from './redux/authToolkitRedux/StoreSlices'

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.authorization.isAuthenticated)
  const routes = useRoutes(isAuthenticated)

  return (
      <Router>
        {isAuthenticated && <MenuAppBar/>}
        <div className="container">{routes}</div>
      </Router>
  )
}

export default App
