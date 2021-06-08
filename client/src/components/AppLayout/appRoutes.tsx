import { Feed } from 'components/Feed/Feed'
import { AddMeme } from 'pages/AddMeme/AddMeme'
import { Switch, Route } from 'react-router-dom'

import { Profile } from '../../pages/Profile'
import { Statistics } from '../../pages/Statistics'
import { ContentPath } from 'constants/enums'

export const routes = (
  <Switch>
    <Route path={ContentPath.Feed} component={Feed} exact />
    <Route path={ContentPath.Profile} component={Profile} exact />
    <Route path={ContentPath.Statistics} component={Statistics} exact />
    <Route path={ContentPath.Add} component={AddMeme} exact />
  </Switch>
)
