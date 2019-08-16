import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

import { setLanguage } from '../redux/actions/account'
import { showSignInForm } from '../redux/actions/sign-in-form'

const languageLabels = {
  en: 'English',
  ru: 'Русский',
  de: 'Deutsch'
}

function Header (props) {
  const { t, i18n } = useTranslation()

  function createHandleChangeLanguage (language) {
    return function () {
      props.setLanguage({ language })
      i18n.changeLanguage(props.account.language)
    }
  }

  return (
    <Navbar className='Header' expand='lg' variant='dark' bg='dark'>
      <Navbar.Text>
        {t('test_task_for')} <a target='_blank' rel='noopener noreferrer' href='https://theboats.com'>TheBoats.com</a>
      </Navbar.Text>
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto' />
        <Nav>
          <NavDropdown alignRight title={languageLabels[i18n.language]} id='collasible-nav-dropdown'>
            {_.map(languageLabels, function (label, code) {
              return <NavDropdown.Item onClick={createHandleChangeLanguage(code)} key={code}>{label}</NavDropdown.Item>
            })}
          </NavDropdown>
          {props.account.email ? <Navbar.Text>{props.account.email}</Navbar.Text> : <Nav.Link onClick={props.showSignInForm}>{t('sign_in')}</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

Header.propTypes = {
  account: PropTypes.exact({ email: PropTypes.string, language: PropTypes.string }).isRequired,
  setLanguage: PropTypes.func,
  showSignInForm: PropTypes.func
}

function mapStateToProps (state) {
  return {
    account: state.account
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setLanguage: (value) => dispatch(setLanguage(value)),
    showSignInForm: () => dispatch(showSignInForm({ defaultValueEmail: '' }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
