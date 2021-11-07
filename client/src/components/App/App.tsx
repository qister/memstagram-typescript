import { useEffect } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import { AppLayout } from 'components/AppLayout/AppLayout'
import { Registration } from 'pages/Registration/Registration'
import { LoginForm } from 'pages/Authorization/Login'
import { setEntryLocation } from 'pages/Authorization/authSlice'
import { useAppDispatch, useAppSelector } from 'hooks'

import './App.scss'

export const App = () => {
  const { isAuthenticated } = useAppSelector((state) => state.authorization)
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(setEntryLocation(location.pathname))
  }, [])

  const routes = isAuthenticated ? (
    <Switch>
      <Route component={AppLayout} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/login" component={LoginForm} exact />
      <Route path="/register" component={Registration} exact />
      <Redirect to="/login" />
    </Switch>
  )

  return routes
}
