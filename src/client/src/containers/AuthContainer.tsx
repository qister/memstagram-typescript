import React from 'react'
import { AuthPage } from '../pages/AuthPage'
import { connect } from 'react-redux'
// import { authLogin } from '../actions/authActions'
import { setCurrentUser } from '../redux/actions/appActions'

const mapStateToProps = (state: any) => {
  return {
    authStarted: state.authorization.authStarted,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    // authLoginAction: (credentials) => dispatch(authLogin(credentials)),
    setCurrentUser: (username: string) => dispatch(setCurrentUser(username)),
  }
}

const AuthPage_ = connect(mapStateToProps, mapDispatchToProps)(AuthPage)

export const AuthContainer = () => {
  return <AuthPage_ />
}
