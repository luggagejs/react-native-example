import { createStore, applyMiddleware } from 'redux'
import app from '../reducers/index'

export default function configureStore() {
  let store = createStore(app, applyMiddleware())
  return store
}