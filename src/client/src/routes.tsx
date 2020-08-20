import React from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import { MainPageContainer } from './containers/MainPageContainer'
import { AddPage_ } from './pages/AddPage'
import { ShowPage } from './pages/ShowPage'
import { AuthPage } from './pages/AuthPage'
import { AuthContainer } from './containers/AuthContainer'
import { AddPageContainer } from './containers/AddPageContainer'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPageContainer />
        </Route>
        <Route path="/add" exact>
          <AddPageContainer />
        </Route>
        <Route path="/show" exact>
          <ShowPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/">
        <AuthContainer />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
