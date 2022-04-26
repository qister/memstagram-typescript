import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import 'antd/dist/antd.min.css'

import { App } from './components/App/App'
import { ErrorBoundary } from 'utils/ErrorBoundary'
import { AuthProvider } from 'auth'

const queryClient = new QueryClient()

ReactDOM.render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
  document.getElementById('root'),
)
