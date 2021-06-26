import { Provider } from 'react-redux'
import { configureStore } from '../../redux/authToolkitRedux'

import { AppTemplate } from './AppTemplate'

export const store = configureStore()

export function AppBehavior() {
  return (
    <Provider store={store}>
      <AppTemplate />
    </Provider>
  )
}
