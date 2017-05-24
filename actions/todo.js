export const FETCHING_DATA         = 'FETCHING_DATA'
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS'
export const FETCHING_DATA_FEILURE = 'FETCHING_DATA_FEILURE'

export function getDataSuccess(list) {
  return {
    type: FETCHING_DATA_SUCCESS,
    list
  }
}

export function getDataFailure() {
  console.log('fetch data: failure')
  return {
    type: FETCHING_DATA_FEILURE
  }
}

export function fetchData() {
  console.log('fetch data')
  return {
    type: FETCHING_DATA
  }
}
