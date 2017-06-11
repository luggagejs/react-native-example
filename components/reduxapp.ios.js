import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { luggageMiddleware } from 'react-luggage-redux'
import { Text } from 'react-native'
import reducer from '../reducers/index'
import createSessionManager from '../lib/createSessionManager'

class ReduxApp extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    const { token } = this.props
    const SessionManager = createSessionManager(token)
    this.s = createStore(
      reducer,
      applyMiddleware(luggageMiddleware({
        apiKey: 'tqx0ze13xl6vawf',
        SessionManager
      }))
    )
  }

  render() {
    return (
      <Provider store={this.s}>
        <Text>Text</Text>
      </Provider>
    )
  }
}

export default ReduxApp
