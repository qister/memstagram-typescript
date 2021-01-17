import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useRoutes } from '../../customHooks/routes'
import { MenuBar } from '../MenuBar'
import { RootState } from '../../redux/authToolkitRedux/StoreSlices'
import '../../styles/App.scss'
import 'materialize-css'

  export function AppTemplate() {
  const isAuthenticated = useSelector((state: RootState) => state.authorization.isAuthenticated)
  //TODO для разработки, убрать
  // const isAuthenticated = true
  const routes = useRoutes(isAuthenticated)

  return (
    <Router>
      {isAuthenticated && <MenuBar/>}
      <div className="app">{routes}</div>
    </Router>
  )
}
