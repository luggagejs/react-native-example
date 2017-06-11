import React, { Component } from 'react'
import { WebView, AppRegistry } from 'react-native'
import TokenStorage from './lib/TokenStorage'
import ReduxApp from './components/reduxapp'

const APP_KEY = 'tqx0ze13xl6vawf'
const DROPBOX_URL = [
  'https://www.dropbox.com/1/oauth2/authorize',
  '?response_type=token',
  '&client_id=' + APP_KEY,
  '&redirect_uri=oauth2todo://foo'
].join('')

export class App extends Component {
  state = {
    token: '',
    isAutorized: false
  }

  constructor(props) {
    super(props)
    this.tokenStorage = new TokenStorage()
  }

  componentDidMount() {
    this.tokenStorage.getToken().then(token => {
      this.setState({
        token,
        isAutorized: true
      })
    })
  }

  onShouldStartLoadWithRequest = (navigator) => {
    const matchToken = navigator.url.match(/access_token=([\w\-\_]+)/)

    if (matchToken) {
      const [, token] = matchToken
      this.tokenStorage.setToken(token)
      this.setState({
        token,
        isAutorized: true
      })
      if (this.webview) {
        this.webview.stopLoading()
      }
      return false
    }
    return true
  }

  render() {
    const { isAutorized, token } = this.state

    return (
      isAutorized ? <ReduxApp token={token} /> :
        <WebView
                ref={(webview) => {
                  this.webview = webview
                }}
                source={{uri: DROPBOX_URL}}
                // for iOS
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                // for Andriod
                onNavigationStateChange={this.onShouldStartLoadWithRequest}
        />
    )
  }
}

AppRegistry.registerComponent('ToDoReactNative', () => App)
