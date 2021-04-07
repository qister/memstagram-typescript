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
import { Registration } from 'pages/Registration/StepsRegistration/Registration'
import { LoginForm } from 'pages/Authorization/Login'
import { fetchUpdateTokens } from 'redux/authToolkitRedux/StoreSlices/authorization'
import { fetchUser } from 'redux/authToolkitRedux/StoreSlices/app'

export function AppTemplate() {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authorization,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    // TODO сделать чтобы при логауте не отправлялся запрос на обновление токенов
    dispatch(fetchUpdateTokens())
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUser())
    }

    const interval = setInterval(() => {
      dispatch(fetchUpdateTokens())
    }, 10 * 60 * 1000)

    return () => clearInterval(interval)
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
      {/* <Route component={LoginForm} /> */}
    </>
  )

  return (
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  )
}
