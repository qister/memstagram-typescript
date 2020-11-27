import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './redux/store/index'
import { AppTemp } from './components/App/AppTemp';
import './index.css';

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
      <AppTemp />
    </Provider>,
  document.getElementById('root')
);
