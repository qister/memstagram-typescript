import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import 'antd/dist/antd.min.css'

import { App } from './components/App/App'
import { createStore } from 'redux/store'
import { ErrorBoundary } from 'utils/ErrorBoundary'
import { AuthProvider } from 'auth'

const queryClient = new QueryClient()

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={createStore()}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
)
