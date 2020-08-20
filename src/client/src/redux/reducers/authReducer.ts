import {
  AUTH_COMPLETED,
  AUTH_STARTED,
  AUTH_FAILED,
  LOGGED_IN,
} from '../actions/authActions'

const initialState = {
  authData: {},
  authStarted: false,
  authCompleted: false,
  authFailed: null,
  loggedIn: false,
}

export const authReducer = (state = initialState, action: any) => {

  switch (action.type) {
    case AUTH_STARTED: {
      return { ...state, authStarted: true }
    }

    case AUTH_COMPLETED: {
      return {
        ...state,
        authStarted: false,
        authCompleted: true,
        authData: action.payload,
      }
    }

    case AUTH_FAILED: {
      return {
        ...state,
        authStarted: false,
        authCompleted: false,
        authFailed: action.error,
      }
    }

    case LOGGED_IN: {
      return {
        ...state,
        loggedIn: true,
      }
    }

    default:
      return state
  }
}
