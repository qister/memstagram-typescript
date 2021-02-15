import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { MemesFeed } from '../../pages/MemesFeed'
import { Profile } from '../../pages/Profile'
import { Statistics } from '../../pages/Statistics'
// import { AddMeme } from '../pages/AddMeme'

export const useRoutes = () => {
  return (
    <Switch>
      <Route path='/feed' exact>
        <MemesFeed />
      </Route>
      <Route path='/profile' exact>
        <Profile />
      </Route>
      <Route path='/statistics' exact>
        <Statistics />
      </Route>
      <Redirect to='/feed' />
    </Switch>
  )
}
