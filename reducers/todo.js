import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FEILURE } from '../actions/todo'

const initialState = {
  status: {
    isFetching: false,
    isFetched: false,
    error: false
  },
  list: {
    id: '',
    title: '',
    completed: false
  }
}

export default function todo (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        status: { isFetching: true }
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          list: action.list
        },
        status: {
          isFetching: false,
          isFetched: true
        }
      }
    case FETCHING_DATA_FEILURE:
      return {
        ...state,
        status: {
          isFetching: false,
          error: true
        }
      }
    default:
      return state
  }
}
