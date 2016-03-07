import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from '../routes'
import configureStore from '../configure-store'

const intialState = (typeof window === 'object' && window.__INITIAL_STATE__) || {}
const store = configureStore(intialState, browserHistory)

const history = syncHistoryWithStore(browserHistory, store)

export default function () {
  return (
    <Provider store={store}>
      <Router routes={routes} history={history} />
    </Provider>
  )
}
