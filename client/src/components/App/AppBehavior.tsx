import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { configureStore } from '../../redux/authToolkitRedux'
import { AppTemplate } from './AppTemplate'

export const store = configureStore()

export const AppBehavior = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppTemplate />
      </Router>
    </Provider>
  )
}
