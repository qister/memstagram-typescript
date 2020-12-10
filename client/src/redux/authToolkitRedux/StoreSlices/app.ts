import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMemes, likeMeme } from '../../../API/memesAPI'

export enum FetchingStatus {
  idle = 'idle',
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

export interface AppState {
  currentUser: string
  memeList: Array<{}>
  FetchingStatus: FetchingStatus
  error: any
}

const initialState: AppState = {
  currentUser: '',
  memeList: [],
  FetchingStatus: FetchingStatus.idle,
  error: null,
}

export const appInit = createAsyncThunk('appInit', () => {
  return getMemes()
})

export const like = createAsyncThunk('like', (id: number) => {
  return likeMeme(id)
})

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(appInit.pending, (state) => {
        state.FetchingStatus = FetchingStatus.pending
      })
      .addCase(appInit.fulfilled, (state, { payload }) => {
        state.FetchingStatus = FetchingStatus.fulfilled
        state.memeList = payload
      })
      .addCase(appInit.rejected, (state) => {
        state.FetchingStatus = FetchingStatus.rejected
      })
      .addCase(like.pending, (state) => {
        state.FetchingStatus = FetchingStatus.rejected
      })
      .addCase(like.fulfilled, (state, { meta: { arg } }) => {
        state.FetchingStatus = FetchingStatus.fulfilled
        state.memeList = state.memeList.map((meme: any) => {
          if (meme.id === arg) {
            return {
              ...meme,
              likedBy: meme.likedBy.some(
                (user: string) => user === state.currentUser,
              )
                ? meme.likedBy.filter(
                    (user: string) => user !== state.currentUser,
                  )
                : [
                    ...meme.likedBy,
                    //TODO
                    state.currentUser,
                  ],
            }
          } else {
            return meme
          }
        })
        // state.memeList = state.memeList.map
      })
      .addCase(like.rejected, (state) => {
        // state.FetchingStatus = FetchingStatus.rejected
        state.FetchingStatus = FetchingStatus.fulfilled
      })
  },
})

export default app.reducer
