import { Feed } from 'components/Feed/Feed'
import { AddMeme } from 'pages/AddMeme/AddMeme'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Profile } from '../../pages/Profile'
import { Statistics } from '../../pages/Statistics'
import { ContentPath } from 'constants/enums'

export const routes = (
  <Switch>
    <Route path={ContentPath.Feed} exact>
      <Feed />
    </Route>
    <Route path={ContentPath.Profile} exact>
      <Profile />
    </Route>
    <Route path={ContentPath.Statistics} exact>
      <Statistics />
    </Route>
    <Route path={ContentPath.Add} exact>
      <AddMeme />
    </Route>
    <Redirect to={ContentPath.Feed} />
  </Switch>
)
