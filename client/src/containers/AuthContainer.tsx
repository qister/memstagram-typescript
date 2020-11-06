import React from 'react'
import { AuthPage } from '../pages/AuthPage'
import { connect } from 'react-redux'
import { setUser } from '../redux/actions/appActions'
// import { authLogin } from '../actions/authActions'
// import { setCurrentUser } from '../redux/actions/appActions'

// const mapStateToProps = (state: any) => {
//   return {
//     authStarted: state.authorization.authStarted,
//   }
// }

const mapDispatchToProps = (dispatch: any) => {
  return {
    // authLoginAction: (credentials) => dispatch(authLogin(credentials)),
    setUser: (username: string) => dispatch(setUser(username)),
  }
}

const AuthPage_ = connect(null, mapDispatchToProps)(AuthPage)

export const AuthContainer = () => {
  return <AuthPage_ />
}
