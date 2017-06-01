import React from 'react'
import {render} from 'react-dom'
import store from './store/store'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import routes from './components/routes'

const rootElement = document.getElementById('app');

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  rootElement
);
