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

export const like = createAsyncThunk(
  'like',
  async ({ id, email }: any, { getState }) => {
 

    //@ts-ignore
    // const { email } = getState().authorization
    return likeMeme(id, email)
  },
)

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
        state.FetchingStatus = FetchingStatus.pending
      })
      .addCase(
        like.fulfilled,
        (
          state,
          {
            meta: {
              arg: { id, email },
            },
          },
        ) => {
          state.FetchingStatus = FetchingStatus.fulfilled
          // TODO
          // Вытаскивать текущего пользователя напрямую из другого стора 
          // const { email } = getState().authorization
          state.memeList = state.memeList.map((meme: any) => {
            if (meme.id === id) {
              return {
                ...meme,
                likedBy: meme.likedBy.some((user: string) => user === email)
                  ? meme.likedBy.filter((user: string) => user !== email)
                  : [
                      ...meme.likedBy,
                      //TODO
                      email,
                    ],
              }
            } else {
              return meme
            }
          })
        },
      )
      .addCase(like.rejected, (state) => {
        // state.FetchingStatus = FetchingStatus.rejected
        state.FetchingStatus = FetchingStatus.fulfilled
      })
  },
})

export default app.reducer
