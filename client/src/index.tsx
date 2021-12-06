import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import 'antd/dist/antd.css'

import { App } from './components/App/App'
import { createStore } from 'redux/store'
import { ErrorBoundary } from 'utils/ErrorBoundary'

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={createStore()}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
)
