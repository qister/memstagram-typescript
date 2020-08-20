import {
  MEMES_ARE_LOADING,
  MEMES_LOADED,
  MEMES_LOAD_FAILED,
  GET_USER,
  SET_CURRENT_USER,
  LIKE_ID,
} from '../actions/appActions'

type AppState = {
  currentUser: string,
  data: Array<{}>,
  isLoading: boolean,
  isLoaded: boolean,
  error: any
}

const initialState: AppState = {
  currentUser: '',
  data: [],
  isLoading: false,
  isLoaded: false,
  error: null,
}

type Action = {
  type: string,
  payload: any,
  error: any
}

export const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case MEMES_ARE_LOADING: {
      return { ...state, isLoading: true }
    }

    case MEMES_LOADED: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload,
      }
    }

    case MEMES_LOAD_FAILED: {
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        error: action.error,
      }
    }

    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      }
    }

    case GET_USER: {
      return {
        ...state,
        currentUser: action.payload,
      }
    }

    case LIKE_ID: {
      const currentUser = JSON.parse(localStorage.getItem('userData')!).email

      return {
        ...state,
        data: state.data.map((meme: any) => {
          if (meme.id === action.payload) {
            return {
              ...meme,
              likedBy: meme.likedBy.some((user: string) => user === currentUser)
                ? meme.likedBy.filter((user: string) => user !== currentUser)
                : [...meme.likedBy, currentUser],
            }
          } else {
            return meme
          }
        }),
      }
    }

    default:
      return state
  }
}
