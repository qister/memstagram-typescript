import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { RootState } from '../../redux/authToolkitRedux/StoreSlices'
import { AppLayout } from 'components/AppLayout'
import '../../styles/App.scss'
import { Registration } from 'pages/Registration/Registration'
import { LoginForm } from 'pages/Authorization/Login'
import { fetchUser } from 'pages/Profile/userSlice'
import { fetchUpdateTokens } from 'pages/Authorization/authSlice'
import { IFetchingStatus } from 'constants/enums'

const tokenUpdatePeriod = 10 * 60 * 1000 // 10 минут

export function AppTemplate() {
  const { isAuthenticated, logoutFetchingStatus } = useSelector(
    (state: RootState) => state.authorization,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    // setTimeout(() => dispatch(fetchUpdateTokens()), 5000)
    dispatch(fetchUpdateTokens())
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUser())
    }

    const interval = setInterval(() => {
      dispatch(fetchUpdateTokens())
    }, tokenUpdatePeriod)

    if (logoutFetchingStatus === IFetchingStatus.fulfilled) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isAuthenticated])

  const routes = isAuthenticated ? (
    <>
      <Route component={AppLayout} />
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
