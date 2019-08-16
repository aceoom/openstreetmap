import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import { showSignInForm } from '../redux/actions/sign-in-form'
import { hideForgotForm } from '../redux/actions/forgot-form'
import { setUser } from '../redux/actions/account'

function ForgotForm (props) {
  const [state, setState] = useState({ email: props.defaultValueEmail })
  const { t } = useTranslation()

  function handleEmailChange (event) {
    setState({ email: event.target.value })
  }

  function handleSubmit (event) {
    props.setUser({ email: state.email })
    props.hideForgotForm()
  }

  function handleBack (event) {
    props.hideForgotForm()
    props.showSignInForm({ defaultValueEmail: state.email || props.defaultValueEmail })
  }

  return (
    <Modal show={props.visible} onHide={props.hideForgotForm}>
      <Modal.Header closeButton>
        <Modal.Title>{t('forgot_your_password')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>{t('email')}</Form.Label>
            <Form.Control type='email' placeholder={t('enter_email')} onChange={handleEmailChange} defaultValue={props.defaultValueEmail} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleBack}>
          {t('back')}
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          {t('send_reset_link')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ForgotForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  defaultValueEmail: PropTypes.string.isRequired,
  hideForgotForm: PropTypes.func,
  showSignInForm: PropTypes.func,
  setUser: PropTypes.func
}

function mapStateToProps (state) {
  return state.forgotForm
}

function mapDispatchToProps (dispatch) {
  return {
    hideForgotForm: () => dispatch(hideForgotForm()),
    showSignInForm: (value) => dispatch(showSignInForm(value)),
    setUser: (value) => dispatch(setUser(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotForm)
