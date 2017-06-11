import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { luggageMiddleware } from 'react-luggage-redux'
import { AppRegistry } from 'react-native'
import reducer from './reducers/index'
import createSessionManager from './lib/createSessionManager'
import DropboxAutent from 'dropbox-autent'
import TodoList from './components/TodoList'

const API_KEY = 'tqx0ze13xl6vawf'

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
      applyMiddleware(luggageMiddleware({
        apiKey: API_KEY,
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

AppRegistry.registerComponent('ToDoReactNative', () => WithDropboxAutent)
