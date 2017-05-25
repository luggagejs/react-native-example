import { combineReducers } from 'redux'
import { luggageReducer } from 'react-luggage-redux'

const todoApp = combineReducers({
  luggage: luggageReducer
})

export default todoApp
