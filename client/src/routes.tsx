import React from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-dom'

import { Authorization } from './pages/Authorization'
import { AddMeme } from './pages/AddMeme/AddMeme'
import { Main } from './pages/Main/Main'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact>
          <Main />
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
