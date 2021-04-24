import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'

import { RootState } from '../../redux/authToolkitRedux/StoreSlices'
import { AppLayout } from 'components/AppLayout'
import '../../styles/App.scss'
import { Registration } from 'pages/Registration/Registration'
import { LoginForm } from 'pages/Authorization/Login'
import { fetchUser } from 'pages/Profile/userSlice'
import { fetchUpdateTokens } from 'pages/Authorization/authSlice'

// TODO вынести в константы?
const period = 10 * 60 * 1000 // 10 минут

export function AppTemplate() {
  const { isAuthenticated } = useSelector((state: RootState) => state.authorization)

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
    }, period)

    return () => clearInterval(interval)
  }, [isAuthenticated])

  const routes = isAuthenticated ? (
    <>
      <Route path="/" component={AppLayout} />
      <Redirect to="/feed" />
    </>
  ) : (
    <>
      <Route path="/login" component={LoginForm} exact />
      <Route path="/register" component={Registration} exact />
      <Route component={LoginForm} />
    </>
  )

  return (
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  )
}
