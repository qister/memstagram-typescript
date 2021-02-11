import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

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
  return (
    <Router>
      <Switch>
        {isAuthenticated 
          ? <Route path='/' component={AppLayout}/>
          : <Route path='/login' component={Authorization}/>
        }
        {!isAuthenticated && <Redirect to='/login' /> }
      </Switch>
    </Router>
  )
}
