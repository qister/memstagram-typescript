import { Feed } from 'components/Feed/Feed'
import { AddMeme } from 'pages/AddMeme/AddMeme'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Profile } from '../../pages/Profile'
import { Statistics } from '../../pages/Statistics'

export const routes = (
  <Switch>
    <Route path='/feed' exact>
      <Feed />
    </Route>
    <Route path='/profile' exact>
      <Profile />
    </Route>
    <Route path='/statistics' exact>
      <Statistics />
    </Route>
    <Route path='/add' exact>
      <AddMeme />
    </Route>
    <Redirect to='/feed' />
  </Switch>
)
