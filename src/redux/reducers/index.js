import { combineReducers } from 'redux'

import account from './account'
import coordinate from './coordinate'
import forgotForm from './forgot-form'
import signInForm from './sign-in-form'

export default combineReducers({ account, coordinate, forgotForm, signInForm })
