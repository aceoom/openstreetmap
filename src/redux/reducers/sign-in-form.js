import { handleActions } from 'redux-actions'

import { showSignInForm, hideSignInForm } from '../actions/sign-in-form'

const defaultState = { visible: false, defaultValueEmail: '' }

export default handleActions({
  [showSignInForm] (state, action) {
    return { visible: true, defaultValueEmail: action.payload.defaultValueEmail }
  },
  [hideSignInForm] (state, action) {
    return { visible: false, defaultValueEmail: '' }
  }
}, defaultState)
