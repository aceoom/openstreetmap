import _ from 'lodash'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { showSignInForm } from '../redux/actions/sign-in-form'

import Map from '../components/Map'
import SignInForm from '../components/SignInForm'
import ForgotForm from '../components/ForgotForm'

function Main (props) {
  useEffect(function () {
    if (_.isNull(props.account.email)) props.showSignInForm()
  }, [props.account.email])

  return (
    <div className='Main'>
      <Map />
      <SignInForm />
      <ForgotForm />
    </div>
  )
}

Main.propTypes = {
  account: PropTypes.shape({ email: PropTypes.string }).isRequired,
  showSignInForm: PropTypes.func
}

function mapStateToProps (state) {
  return {
    account: state.account
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showSignInForm: () => dispatch(showSignInForm({ defaultValueEmail: '' }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
