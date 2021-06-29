import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import { RootState } from '../../redux/authToolkitRedux/StoreSlices'
import { AppLayout } from 'components/AppLayout'
import '../../styles/App.scss'
import { Registration } from 'pages/Registration/Registration'
import { LoginForm } from 'pages/Authorization/Login'
import { fetchUpdateTokens, setEntryPathname } from 'pages/Authorization/authSlice'

export const AppTemplate = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.authorization)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(setEntryPathname(location.pathname))
    dispatch(fetchUpdateTokens())
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
