import { createMemoryHistory, MemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import { store } from 'redux/authToolkitRedux'

export const renderWithRouter = (
  component: React.ReactElement,
  {
    componentPath,
    initialRoute = '/',
    history = createMemoryHistory({ initialEntries: [initialRoute] }),
  }: { componentPath?: string; initialRoute: string; history?: MemoryHistory<any> },
) => {
  return {
    ...render(component, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {componentPath ? <Route path={componentPath}>{children}</Route> : children}
          </ConnectedRouter>
        </Provider>
      ),
    }),
    history,
  }
}
