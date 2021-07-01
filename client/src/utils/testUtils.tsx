import { createMemoryHistory, MemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Route, Router } from 'react-router-dom'

import { store } from 'redux/authToolkitRedux'

export const renderWithRouter = (
  component: React.ReactElement,
  {
    componentPath,
    initialRoute = '/',
    history = createMemoryHistory({ initialEntries: [initialRoute] }),
  }: { componentPath?: string; initialRoute: string; history?: MemoryHistory<unknown> },
) => {
  return {
    ...render(component, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <Router history={history}>
            {componentPath ? <Route path={componentPath}>{children}</Route> : children}
          </Router>
        </Provider>
      ),
    }),
    history,
  }
}
