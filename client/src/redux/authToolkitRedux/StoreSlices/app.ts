import { uploadMeme } from './../../../API/memesAPI'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMemes, likeMeme } from '../../../API/memesAPI'
import { RootState } from '.'

export enum FetchingStatus {
  idle = 'idle',
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

export interface IMeme {
  id: number
  author: string
  description: string
  imgUrl: string
  likedBy: Array<string>
  //TODO сделать потом чтобы на сервере считалось лайкнул или нет
  liked: boolean
  created: string
}

export interface AppState {
  currentUser: string
  memeList: Array<IMeme>
  FetchingStatus: FetchingStatus
  error: any
  nextPage?: number
  total: number
}

const initialState: AppState = {
  currentUser: '',
  memeList: [],
  FetchingStatus: FetchingStatus.idle,
  error: null,
  total: 0,
}

export const loadMemes = createAsyncThunk('loadMemes', async (page: number = 1) => {
  return getMemes(page)
})

export const like = createAsyncThunk(
  'like',
  async ({ id, email }: any, {getState} ) => {
    //@ts-ignore
    // const { email } = getState().authorization
    return likeMeme(id, email)
  },
)

export const upload = createAsyncThunk('upload', async (data: any) => {
  return uploadMeme(data)
})

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMemes.pending, (state) => {
        state.FetchingStatus = FetchingStatus.pending
      })
      .addCase(
        loadMemes.fulfilled,
        (state, { payload: { memes, total, next } }) => {
          state.FetchingStatus = FetchingStatus.fulfilled
          state.memeList = [...state.memeList, ...memes]
          state.total = total
          state.nextPage = next?.page
        },
      )
      .addCase(loadMemes.rejected, (state) => {
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
                liked: !meme.liked,
                //TODO поправить, чтобы пересчитывать просто количество лайков, а не весь массив пользователей
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
        state.FetchingStatus = FetchingStatus.rejected
      })
      .addCase(upload.pending, () => {})
      .addCase(upload.fulfilled, (state) => {
        console.log('success')

        state.FetchingStatus = FetchingStatus.fulfilled
      })
      .addCase(upload.rejected, () => {})
  },
})

export default app.reducer
