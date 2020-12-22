import React from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-dom'

import { Authorization } from './pages/Authorization'
import { BottomAppBar } from './components/PlusMeme'
import { AddMeme } from './components/AddMeme'
import { Main_ } from './components/Main'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact>
          <Main_ />
        </Route>
        <Route path='/add' exact>
          <AddMeme />
        </Route>
        <Route path='/plus' exact>
          <BottomAppBar />
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
