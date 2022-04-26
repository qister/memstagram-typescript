import { createMemoryHistory, MemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { createStore } from 'redux/store'
import { AuthProvider } from 'auth'

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
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        <Provider store={createStore()}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <HistoryRouter history={history}>
                {componentPath ? (
                  <Routes>
                    <Route path={componentPath} element={children} />
                  </Routes>
                ) : (
                  children
                )}
              </HistoryRouter>
            </AuthProvider>
          </QueryClientProvider>
        </Provider>
      ),
    }),
    history,
  }
}
