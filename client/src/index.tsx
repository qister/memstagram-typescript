import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { App } from './components/App/App'

import 'antd/dist/antd.css'
import './styles/index.css'
import { store } from 'redux/authToolkitRedux'
import { ErrorBoundary } from 'utils/ErrorBoundary'

const history = createBrowserHistory()

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
)
