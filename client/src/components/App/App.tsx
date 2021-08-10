import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import { RootState } from '../../redux/authToolkitRedux/StoreSlices'
import { AppLayout } from 'components/AppLayout/AppLayout'
import { Registration } from 'pages/Registration/Registration'
import { LoginForm } from 'pages/Authorization/Login'
import { setEntryLocation } from 'pages/Authorization/authSlice'

export const App = (props: any) => {
  console.log('App props', props)

  const { isAuthenticated } = useSelector((state: RootState) => state.authorization)
  const dispatch = useDispatch()
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
      <Route path="/login" render={() => <LoginForm />} exact />
      <Route path="/register" component={Registration} exact />
      <Redirect to="/login" />
    </Switch>
  )

  return routes
}
