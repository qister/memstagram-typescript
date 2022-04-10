import { createMemoryHistory, MemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

import { createStore } from 'redux/store'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const renderWithRouter = (
  component: React.ReactElement,
  {
    componentPath,
    initialRoute = '/',
    history = createMemoryHistory({ initialEntries: [initialRoute] }),
  }: { componentPath?: string; initialRoute: string; history?: MemoryHistory },
) => {
  return {
    ...render(component, {
      //@ts-ignore
      wrapper: ({ children }) => (
        <Provider store={createStore()}>
          {/* @ts-ignore */}
          <QueryClientProvider client={queryClient}>
            <HistoryRouter history={history}>
              {componentPath ? (
                <Routes>
                  <Route path={componentPath} element={children} />
                </Routes>
              ) : (
                children
              )}
            </HistoryRouter>
          </QueryClientProvider>
        </Provider>
      ),
    }),
    history,
  }
}
