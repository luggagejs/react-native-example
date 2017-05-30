import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableHighlight, Linking } from 'react-native'
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
    padding: 20,
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

export const APP_KEY = 'tqx0ze13xl6vawf'

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
    var url = Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    }).catch(err => console.error('An error occurred', err));


    this.dropboxOauth(APP_KEY)
    Linking.addEventListener('url', this._handleOpenURL);


    //this.props.fetchCollection('todos')
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  dropboxOauth(app_key) {
    Linking.openURL([
      'https://www.dropbox.com/1/oauth2/authorize',
      '?response_type=token',
      '&client_id=' + app_key,
      '&redirect_uri=oauth2todo://foo'
    ].join(''))
    console.log('event.url');
    Linking.addEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    console.log(event.url);
    Linking.removeEventListener('url', this._handleOpenURL)
  }

  _openLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  addTodo() {
    this.props.addRecord('todos', { text: this.state.text })
    this.state.text = ''
  }

  render() {
    const { todos } = this.props
    return (
      <View style={styles.body}>
        <TextInput style={styles.input}
                   placeholder='New todo'
                   onChangeText={(text) => this.setState({text})}
                   value={this.state.text}
                   onSubmitEditing={this.addTodo.bind(this)} />
          <TouchableHighlight onPress={this._openLink}>
            <Text style={styles.item}>Login Dropbox</Text>
          </TouchableHighlight>
        { todos.map((todo, i) => (
          <View key={i}><Text style={styles.item}>{todo.text}</Text></View>
        )) }
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
