import React from 'react'
import { AppRegistry } from 'react-native'
import { createStore,
         applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { luggageMiddleware } from 'react-luggage-redux'
import reducer from './reducers/index'
import App from './components/app'
import SessionManager from './lib/SessionManager'

const store = createStore(
  reducer,
  applyMiddleware(luggageMiddleware({
    apiKey: 'tqx0ze13xl6vawf',
    SessionManager
  }))
)

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('ToDoReactNative', () => ReduxApp)
