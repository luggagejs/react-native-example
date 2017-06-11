import React, { Component } from 'react'
import { WebView } from 'react-native'
import TokenStorage from '../lib/TokenStorage'

const DropboxAutent = appKey => WrappedComponent => (
  class App extends Component {
    static dropboxUrl = `https://www.dropbox.com/1/oauth2/authorize\
?response_type=token\
&client_id=${appKey}\
&redirect_uri=oauth2todo://foo`

    state = {
      token: ''
    }

    constructor(props) {
      super(props)
      this.tokenStorage = new TokenStorage()
    }

    componentDidMount() {
      this.tokenStorage.getToken().then(token => {
        this.setState({
          token
        })
      })
    }

    onShouldStartLoadWithRequest = navigator => {
      const matchToken = navigator.url.match(/access_token=([\w\-\_]+)/)

      if (matchToken) {
        const [, token] = matchToken
        this.tokenStorage.setToken(token)
        this.setState({
          token
        })
        if (this.webview) {
          this.webview.stopLoading()
        }
        return false
      }
      return true
    }

    render() {
      const { token } = this.state
      const isAuthorized = !!token

      return (
        isAuthorized ? <WrappedComponent token={token} /> :
          <WebView
            ref={(webview) => {
              this.webview = webview
            }}
            source={{uri: App.dropboxUrl}}
            // for iOS
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
            // for Andriod
            onNavigationStateChange={this.onShouldStartLoadWithRequest}
          />
      )
    }
  }
)

export default DropboxAutent
