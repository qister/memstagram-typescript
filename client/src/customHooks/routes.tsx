import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Authorization } from '../pages/Authorization'
import { AddMeme } from '../pages/AddMeme'
import { Meme } from '../pages/Meme'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact>
          <Meme />
        </Route>
        <Route path='/add' exact>
          <AddMeme />
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path='/'>
        <Authorization />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}