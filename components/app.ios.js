import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight } from 'react-native';

import { connect }    from 'react-redux'
import { fetchData }  from '../actions/todo'

const mapStateToProps = state => ({
  id: state.todo.list.id,
  title: state.todo.list.title,
  completed: state.todo.list.completed
})

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
})

const App = (props) => {
  return (
    <View>
      <Text style={styles.mainText}>
        Current weather for
      </Text>
      <View style={styles.zipContainer}>
        <TextInput style={[styles.zipCode, styles.mainText]}
                   placeholder="zip..."
                   returnKeyType="go"
                   onChangeText={(zip) => props.updateZip(zip)}
                   onSubmitEditing={() => props.fetchData()}
                   value={props.zip} />
      </View>
    </View>
  );
}

const baseFontSize = 16

const styles = StyleSheet.create({
  mainText: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#ffffff',
    fontSize: baseFontSize
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
