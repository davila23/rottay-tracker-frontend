import * as Sentry from '@sentry/browser'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from 'cacodemon/app'
import manifest from 'cacodemon/manifest'
import store from 'cacodemon/store'

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
  Sentry.init({ dsn: manifest.sentry.dsn })
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
