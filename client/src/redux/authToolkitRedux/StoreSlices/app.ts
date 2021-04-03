import { uploadMeme } from './../../../API/memesAPI'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMemes, likeMeme } from '../../../API/memesAPI'
import { RootState } from '.'
import { IFetchingStatus } from 'constants/enums'
import { getUser } from 'API/userApi'

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
  currentUser: any
  memeList: Array<IMeme>
  IFetchingStatus: IFetchingStatus
  error: any
  nextPage?: number
  total: number
}

const initialState: AppState = {
  currentUser: {},
  memeList: [],
  IFetchingStatus: IFetchingStatus.idle,
  error: null,
  total: 0,
}

export const loadMemes = createAsyncThunk(
  'loadMemes',
  async (page: number = 1) => {
    return getMemes(page)
  },
)

export const like = createAsyncThunk(
  'like',
  // TODO: сделать чтобы вместо айди использовались строки - поменять модель мема итд
  async ({ id }: { id: number }) => {
    return likeMeme(id)
  },
)

export const upload = createAsyncThunk('upload', async (data: any) => {
  return uploadMeme(data)
})

export const fetchUser = createAsyncThunk('fetchUser', async () => {
  return getUser()
})

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMemes.pending, (state) => {
        state.IFetchingStatus = IFetchingStatus.pending
      })
      .addCase(
        loadMemes.fulfilled,
        (state, { payload: { memes, total, next } }) => {
          state.IFetchingStatus = IFetchingStatus.fulfilled
          state.memeList = [...state.memeList, ...memes]
          state.total = total
          state.nextPage = next?.page
        },
      )
      .addCase(loadMemes.rejected, (state) => {
        state.IFetchingStatus = IFetchingStatus.rejected
      })
      .addCase(like.pending, (state) => {
        state.IFetchingStatus = IFetchingStatus.pending
      })
      .addCase(
        like.fulfilled,
        (
          state,
          {
            meta: {
              arg: { id },
            },
          },
        ) => {
          state.IFetchingStatus = IFetchingStatus.fulfilled
          // TODO
          // Вытаскивать текущего пользователя напрямую из другого стора
          // const { email } = getState().authorization
          const email = '123' // Хардкод чтобы не ломалась функция ниже

          state.memeList = state.memeList.map((meme: any) => {
            if (meme.id === id) {
              return {
                ...meme,
                liked: !meme.liked,
                // TODO поправить, чтобы пересчитывать просто количество лайков, а не весь массив пользователей
                // можно убрать пересчет массива лайков на клиенте
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
        state.IFetchingStatus = IFetchingStatus.rejected
      })
      .addCase(upload.pending, () => {})
      .addCase(upload.fulfilled, (state) => {
        console.log('success')

        state.IFetchingStatus = IFetchingStatus.fulfilled
      })
      .addCase(upload.rejected, () => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user
      })
  },
})

export default app.reducer
