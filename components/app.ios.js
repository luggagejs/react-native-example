import React, { Component }           from 'react'
import { Text, TextInput, View }      from 'react-native';
import PropTypes                      from 'prop-types'
import { bindActionCreators }         from 'redux'
import { connect }                    from 'react-redux'
import { fetchCollection, addRecord } from 'react-luggage-redux'

const mapStateToProps = state => ({
  todos: state.luggage.collections.todos
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCollection,
  addRecord
}, dispatch)

export class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    fetchCollection: PropTypes.func.isRequired,
    addRecord: PropTypes.func.isRequired
  }

  static defaultProps = {
    todos: []
  }

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
      <View>
        <TextInput placeholder='New todo'
                   ref={i => { this.todoInput = i }}
                   onChangeText={(text) => this.setState({text})}
                   value={this.state.text}
                   onSubmitEditing={this.addTodo.bind(this)} />
        { todos.map((todo, i) => <View key={i}><Text>{todo.text}</Text></View>) }
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
