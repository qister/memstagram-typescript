import { Feed } from 'pages/Feed/Feed'
import { AddMeme } from 'pages/AddMeme/AddMeme'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Profile } from 'pages/Profile/Profile'
import { Statistics } from 'pages/Statistics/Statistics'
import { ContentPath } from 'constants/enums'

export const AppLayoutRoutes = () => (
  <Switch>
    <Route path={ContentPath.Feed} component={Feed} exact />
    <Route path={ContentPath.Profile} component={Profile} exact />
    <Route path={ContentPath.Statistics} component={Statistics} exact />
    <Route path={ContentPath.Add} component={AddMeme} exact />
    <Redirect to={ContentPath.Feed} />
  </Switch>
)
