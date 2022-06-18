import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import 'antd/dist/antd.min.css'

import { App } from './components/App/App'
import { ErrorBoundary } from 'utils/ErrorBoundary'
import { AuthProvider } from 'auth'

const queryClient = new QueryClient()

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
)
