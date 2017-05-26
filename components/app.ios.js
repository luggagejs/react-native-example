import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
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
    this.props.fetchCollection('todos')
  }

  addTodo() {
    this.props.addRecord('todos', { text: this.todoInput.value })
    this.todoInput.value = ''
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
