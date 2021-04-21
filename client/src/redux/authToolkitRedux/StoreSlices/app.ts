import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IFetchingStatus } from 'constants/enums'
import { getUser } from 'API/userApi'
import { RootState } from '.'
import { getMemeList, getUserMemes, likeMeme, uploadMeme } from 'API/memesAPI'

export interface IMeme {
  //TODO мб тип надо поменять на ObjectId, хотя сейчас работает и так
  _id: string
  author: string
  description: string
  imgUrl: string
  likedBy: Array<string>
  liked: boolean
  created: string
}

export interface AppState {
  currentUser: any
  userMemes: Array<IMeme>
  memeList: Array<IMeme>
  //TODO поменять на FetchingStatus
  IFetchingStatus: IFetchingStatus
  error: any
  nextPage: number
  total: number
}

const initialState: AppState = {
  currentUser: {},
  userMemes: [],
  memeList: [],
  IFetchingStatus: IFetchingStatus.idle,
  error: null,
  nextPage: 1,
  total: 0,
}

export const fetchMemeList = createAsyncThunk('fetchMemeList', (_, { getState }) => {
  const {
    app: { nextPage },
  } = getState() as RootState
  return getMemeList(nextPage)
})

export const fetchUserMemes = createAsyncThunk('fetchUserMemes', getUserMemes)

export const fetchLikeMeme = createAsyncThunk('fetchLikeMeme', ({ _id }: { _id: string }) => {
  return likeMeme(_id)
})

export const upload = createAsyncThunk('upload', (data: any) => uploadMeme(data))

export const fetchUser = createAsyncThunk('fetchUser', getUser)

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemeList.pending, (state) => {
        state.IFetchingStatus = IFetchingStatus.pending
      })
      .addCase(fetchMemeList.fulfilled, (state, action) => {
        const { memes, total, next } = action.payload.data
        state.IFetchingStatus = IFetchingStatus.fulfilled
        state.memeList = [...state.memeList, ...memes]
        state.total = total
        // TODO поправить пагинацию и убрать ? тк сейчас next.page приходит не всегда
        state.nextPage = next?.page
      })
      .addCase(fetchMemeList.rejected, (state) => {
        state.IFetchingStatus = IFetchingStatus.rejected
      })
      .addCase(fetchLikeMeme.pending, (state) => {
        state.IFetchingStatus = IFetchingStatus.pending
      })
      .addCase(
        fetchLikeMeme.fulfilled,
        (
          state,
          {
            meta: {
              arg: { _id },
            },
          },
        ) => {
          state.IFetchingStatus = IFetchingStatus.fulfilled
          state.memeList = state.memeList.map((meme) =>
            meme._id === _id ? { ...meme, liked: !meme.liked } : meme,
          )
        },
      )
      .addCase(fetchLikeMeme.rejected, (state) => {
        state.IFetchingStatus = IFetchingStatus.rejected
      })
      .addCase(upload.pending, () => {})
      .addCase(upload.fulfilled, (state) => {
        state.IFetchingStatus = IFetchingStatus.fulfilled
      })
      .addCase(upload.rejected, () => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data.user
      })
      //TODO разделить этот редюсер
      .addCase(fetchUserMemes.fulfilled, (state, action) => {
        state.userMemes = action.payload.data.memes
        state.currentUser.memesCount = action.payload.data.total
      })
  },
})

const { reducer } = app

export { reducer as app }
