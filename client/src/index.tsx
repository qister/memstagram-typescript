import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from './components/App/App'

import 'antd/dist/antd.css'
import './styles/index.css'
import { store } from 'redux/authToolkitRedux'
import { ErrorBoundary } from 'utils/ErrorBoundary'

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
)
