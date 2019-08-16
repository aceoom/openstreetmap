import { handleActions } from 'redux-actions'

import { setCoordinate } from '../actions/coordinate'

const defaultState = { lat: null, lng: null, zoom: null }

export default handleActions({
  [setCoordinate] (state, action) {
    return { ...state, ...action.payload }
  }
}, defaultState)
