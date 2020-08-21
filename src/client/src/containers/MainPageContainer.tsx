import React from 'react'
import { Main_ } from '../components/Main'
import { connect } from 'react-redux'
import { addMeme, like, initMemes, setUser } from '../redux/actions/appActions'

function mapStateToProps(state: any) {
  return {
    list: state.app.data,
    currentUser: state.currentUser,
    isLoading: state.app.isLoading,
    isLoaded: state.app.isLoaded,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    like: (id: number) => dispatch(like(id)),
    addMeme: (meme: object) => dispatch(addMeme(meme)),
    initMemes: () => dispatch(initMemes()),
    setUser: (user: string) => dispatch(setUser( user)),
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(Main_)

export const MainPageContainer = () => {
  return <Main />
}