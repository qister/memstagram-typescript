import { Feed } from 'components/Feed/Feed'
import { AddMeme } from 'components/AddMeme/AddMeme'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Profile } from '../Profile/Profile'
import { Statistics } from '../Statistics'
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
