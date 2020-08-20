import { getMemes, likeMeme, uploadMeme } from '../../API/memesAPI'

export const LIKE_ID = 'LIKE_ID'
export const ADD_MEME = 'ADD_MEME'
export const LOAD_INITIAL_MEMES = 'LOAD_INITIAL_MEMES'
export const GET_USER = 'GET_USER'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const MEMES_ARE_LOADING = 'MEMES_ARE_LOADING'
export const MEMES_LOADED = 'MEMES_LOADED'
export const MEMES_LOAD_FAILED = 'MEMES_LOAD_FAILED'
export const GET_USER_EMAIL = 'GET_USER_EMAIL'

export const addMeme = (meme: any) => {
  console.log('Meme', meme)

  return {
    type: ADD_MEME,
    payload: meme,
  }
}

export const memesIsLoading = () => {
  return {
    type: MEMES_ARE_LOADING,
  }
}

export const memesIsLoaded = (data: boolean) => {
  return {
    type: MEMES_LOADED,
    payload: data,
  }
}

export const memesIsFail = (error: any) => {
  return {
    type: MEMES_LOAD_FAILED,
    payload: error,
  }
}

export const initMemes = () => {
  return async (dispatch: any) => {
    dispatch(memesIsLoading())
    await getMemes()
      .then((data) => dispatch(memesIsLoaded(data)))
      .catch((error) => dispatch(memesIsFail(error)))
  }
}

export const upload = (meme: any) => {
  return async (dispatch: any) => {
    await uploadMeme(meme)

  }
}

export const addLiked = (id: number) => {
  return {
    type: LIKE_ID,
    payload: id,
  }
}

export const like = (id: number) => {
  return async (dispatch: any) => {
    await likeMeme(id)
    dispatch(addLiked(id))
  }
}

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem('userData')!).email
  console.log(user)
  return {
    type: GET_USER,
    payload: user,
  }
}

export const getUserEmail = () => {
  return {
    type: GET_USER_EMAIL,
  }
}

export const setCurrentUser = (username: string) => {
  localStorage.setItem('memeUserName', username)
  return {
    type: SET_CURRENT_USER,
    payload: username,
  }
}
