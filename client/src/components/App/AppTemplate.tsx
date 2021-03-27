import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'

import { RootState } from '../../redux/authToolkitRedux/StoreSlices'
import { AppLayout } from 'components/AppLayout'
import '../../styles/App.scss'
import 'materialize-css'
import { Registration } from 'pages/Registration/Registration'
import { LoginForm } from 'pages/Authorization/Login'
import { initToken } from 'redux/authToolkitRedux/StoreSlices/authorization'

export function AppTemplate() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authorization.isAuthenticated,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initToken())
  }, [isAuthenticated])

  const routes = isAuthenticated ? (
    <>
      <Route path='/' component={AppLayout} />
      <Redirect to='/feed' />
    </>
  ) : (
    <>
      <Route path='/login' component={LoginForm} exact />
      <Route path='/register' component={Registration} exact />
      <Route component={LoginForm} />
    </>
  )

  return (
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  )
}
