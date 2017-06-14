import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { luggageMiddleware } from 'react-luggage-redux'
import { DropboxXMLHttpBackend } from 'luggage'
import DropboxAutent from './DropboxAutent'
import reducer from '../reducers/index'
import createSessionManager from '../lib/createSessionManager'
import TodoList from './TodoList'

const API_KEY = 'tqx0ze13xl6vawf'

const logger = store => next => action => {
  let result = next(action)
  return result
}


class App extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    const { token } = this.props
    const SessionManager = createSessionManager(token)
    this.store = createStore(
      reducer,
      applyMiddleware(logger, luggageMiddleware({
        apiKey: API_KEY,
        Backend: DropboxXMLHttpBackend,
        SessionManager
      }))
    )
  }

  render() {
    return (
      <Provider store={this.store}>
        <TodoList />
      </Provider>
    )
  }
}

const WithDropboxAutent = DropboxAutent({apiKey: API_KEY, redirectUrl: 'oauth2todo://foo'})(App)
export default WithDropboxAutent
