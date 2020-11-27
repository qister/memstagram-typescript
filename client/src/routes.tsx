import React from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import { MainPageContainer } from './containers/MainPageContainer'
import { AddPage_ } from './pages/AddPage'
import { ShowPage } from './pages/ShowPage'
import { Authorization } from './pages/Authorization'
import { AddPageContainer } from './containers/AddPageContainer'
import { BottomAppBar } from './components/PlusMeme'
import { AddMeme } from './components/AddMeme'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPageContainer />
        </Route>
        <Route path="/add" exact>
        {/* < AddPage_ /> */}
        < AddMeme />
        </Route>
        <Route path="/show" exact>
          <ShowPage />
        </Route>
        <Route path="/plus" exact>
          <BottomAppBar />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/">
        <Authorization />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
