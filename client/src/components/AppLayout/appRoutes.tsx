import { Feed } from 'components/Feed/Feed'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Profile } from '../../pages/Profile'
import { Statistics } from '../../pages/Statistics'
//TODO добавить роут и страницу для загрузки мема
// import { AddMeme } from '../pages/AddMeme'

export const useRoutes = () => {
  return (
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
      <Redirect to='/feed' />
    </Switch>
  )
}
