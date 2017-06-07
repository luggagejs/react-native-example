import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableHighlight, Linking, WebView } from 'react-native'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchCollection, addRecord } from 'react-luggage-redux'

const mapStateToProps = state => ({
  todos: state.luggage.collections.todos
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCollection,
  addRecord
}, dispatch)

const baseFontSize = 16

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'rgba(245,243,243,1)',
    height: null,
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    padding: 10,
    width: null
  },
  input: {
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    height: 40,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  item: {
    color: '#000000',
    fontSize: baseFontSize,
    marginBottom: 5
  }
})

const APP_KEY = 'tqx0ze13xl6vawf'
const DROPBOX_URL = [
      'https://www.dropbox.com/1/oauth2/authorize',
      '?response_type=token',
      '&client_id=' + APP_KEY,
      '&redirect_uri=oauth2todo://foo'
    ].join('')

export class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    fetchCollection: PropTypes.func.isRequired,
    addRecord: PropTypes.func.isRequired
  }

  static defaultProps = {
    todos: []
  }

  state = { text: '' }

  componentDidMount() {
  }

  addTodo() {
    this.props.addRecord('todos', { text: this.state.text })
    this.state.text = ''
  }

  getTokenFromUrl(url) {
    const token = url.replace(/^(.*access_token=)(.*)/, '$2')
    if (token !== url) {
      return token.replace(/^(.*?)(&.*)/, '$1')
    } else
      return ''
  }

  onShouldStartLoadWithRequest = (navigator) => {
    const token = this.getTokenFromUrl(navigator.url)
    if (token) {
      this.webview.stopLoading()
      return false
    } else {
      return true
    }
  }

  render() {
    const { todos } = this.props
    return (
        <WebView
                ref={(webview) => { this.webview = webview }} 
                source={{uri: DROPBOX_URL}}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} // for iOS
                onNavigationStateChange={this.onShouldStartLoadWithRequest} // for Andriod
        />
    )
  }


}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
