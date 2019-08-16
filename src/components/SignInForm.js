import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import { hideSignInForm } from '../redux/actions/sign-in-form'
import { showForgotForm } from '../redux/actions/forgot-form'
import { setUser } from '../redux/actions/account'

function SignInForm (props) {
  const [state, setState] = useState({ email: props.defaultValueEmail })
  const { t } = useTranslation()

  function handleEmailChange (event) {
    setState({ email: event.target.value })
  }

  function handleSubmit (event) {
    props.setUser({ email: state.email })
    props.hideSignInForm()
  }

  function handleClickForgotPassword (event) {
    event.preventDefault()
    props.hideSignInForm()
    props.showForgotForm({ defaultValueEmail: state.email })
  }

  return (
    <Modal show={props.visible} onHide={props.hideSignInForm}>
      <Modal.Header closeButton>
        <Modal.Title>{t('sign_in')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>{t('email')}</Form.Label>
            <Form.Control type='email' placeholder={t('enter_email')} onChange={handleEmailChange} defaultValue={props.defaultValueEmail} />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>{t('password')}</Form.Label>
            <Form.Control type='password' placeholder={t('password')} />
          </Form.Group>
          <Form.Group controlId='formBasicChecbox'>
            <Form.Check type='checkbox' label={t('remember_me')} />
          </Form.Group>

          <Form.Group controlId='formBasicLink'>
            <Button variant='link' onClick={handleClickForgotPassword}>{t('forgot_password')}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.hideSignInForm}>
          {t('close')}
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          {t('sign_in')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

SignInForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  defaultValueEmail: PropTypes.string.isRequired,
  hideSignInForm: PropTypes.func,
  showForgotForm: PropTypes.func,
  setUser: PropTypes.func
}

function mapStateToProps (state) {
  return state.signInForm
}

function mapDispatchToProps (dispatch) {
  return {
    hideSignInForm: () => dispatch(hideSignInForm()),
    showForgotForm: (value) => dispatch(showForgotForm(value)),
    setUser: (value) => dispatch(setUser(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)
