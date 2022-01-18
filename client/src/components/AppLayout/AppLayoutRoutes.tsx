import { Switch, Route, Redirect } from 'react-router-dom'

import { Profile } from 'pages/Profile/Profile'
import { Statistics } from 'pages/Statistics/Statistics'
import { ContentPath } from 'constants/enums'
import { AddMeme } from 'pages/AddMeme/AddMeme'
import { Feed } from 'pages/Feed/Feed'
import { VirtualFeed } from 'pages/Feed/VirtualFeed'

export const AppLayoutRoutes = () => (
  <Switch>
    <Route path={ContentPath.Feed} exact>
      <VirtualFeed />
      {/* <Feed /> */}
    </Route>
    <Route path={ContentPath.Profile} component={Profile} exact />
    <Route path={ContentPath.Statistics} component={Statistics} exact />
    <Route path={ContentPath.Add} component={AddMeme} exact />
    <Redirect to={ContentPath.Feed} />
  </Switch>
)
