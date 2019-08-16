import { handleActions } from 'redux-actions'

import { showForgotForm, hideForgotForm } from '../actions/forgot-form'

const defaultState = { visible: false, defaultValueEmail: '' }

export default handleActions({
  [showForgotForm] (state, action) {
    return { visible: true, defaultValueEmail: action.payload.defaultValueEmail }
  },
  [hideForgotForm] (state, action) {
    return { visible: false, defaultValueEmail: '' }
  }
}, defaultState)
