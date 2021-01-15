import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from '../../routes'
import { MenuAppBar } from './../MenuAppBar'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/authToolkitRedux/StoreSlices'
import './App.scss'
import 'materialize-css'

function App() {

  const isAuthenticated = useSelector((state: RootState) => state.authorization.isAuthenticated)
  //TODO для разработки, убрать
  // const isAuthenticated = true
  const routes = useRoutes(isAuthenticated)

  return (
      <Router>
        {isAuthenticated && <MenuAppBar/>}
        <div className="app">{routes}</div>
      </Router>
  )
}

export default App
