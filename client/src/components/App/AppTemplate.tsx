import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect, BrowserRouter as Router  } from 'react-router-dom'

import { RootState } from '../../redux/authToolkitRedux/StoreSlices'
import { AppLayout } from 'components/AppLayout'
import { Authorization } from '../../pages/Authorization'
import '../../styles/App.scss'
import 'materialize-css'

export function AppTemplate() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authorization.isAuthenticated,
  )
  // const isAuthenticated = true

  const routes = isAuthenticated ?
    <>
      <Route path='/' component={AppLayout} /> 
      <Redirect to='/feed' />
    </>
  : 
    <>
      <Route path='/login' component={Authorization} />
      <Redirect to='/login' />
    </>

  return (
    <Router>
      <Switch>
        {routes}
      </Switch>
    </Router>
  )
}
