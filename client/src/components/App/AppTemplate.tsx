import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useRoutes } from '../../customHooks/routes'
import { RootState } from '../../redux/authToolkitRedux/StoreSlices'
import { AppLayout } from 'components/Layout/Layout'
import '../../styles/App.scss'
import 'materialize-css'

export function AppTemplate() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authorization.isAuthenticated,
  )
  //TODO для разработки, убрать
  // const isAuthenticated = true
  const routes = useRoutes(isAuthenticated)

  return (
    <AppLayout>
      <Router>
        <div className='app'>{routes}</div>
      </Router>
    </AppLayout>
  )
}
