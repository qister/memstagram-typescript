import React from 'react'
import { useSelector } from 'react-redux'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'

import { RootState } from '../../redux/authToolkitRedux/StoreSlices'
import { AppLayout } from 'components/AppLayout'
import { Authorization } from '../../pages/Authorization'
import '../../styles/App.scss'
import 'materialize-css'
import { Registration } from 'pages/Registration/Registration'
import { LoginForm } from 'pages/Authorization/Login'

export function AppTemplate() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authorization.isAuthenticated,
  )
  // const isAuthenticated = true

  const routes = isAuthenticated ? (
    <>
      <Route path='/' component={AppLayout} />
      <Redirect to='/feed' />
    </>
  ) : (
    <>
      {/* <Route path='/login' component={Authorization} /> */}
      <Route path='/login' component={LoginForm} exact/>
      <Route path='/register' component={Registration} exact/>
      {/* <Redirect to='/login' /> */}
    </>
  )

  return (
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  )
}
