import { handleActions } from 'redux-actions'

import { setUser, setLanguage } from '../actions/account'

const defaultState = { email: null, language: 'en' }

export default handleActions({
  [setUser] (state, action) {
    return { ...state, email: action.payload.email }
  },
  [setLanguage] (state, action) {
    return { ...state, language: action.payload.language }
  }
}, defaultState)
