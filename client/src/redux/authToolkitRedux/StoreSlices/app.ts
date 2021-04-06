import { uploadMeme } from './../../../API/memesAPI'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMemeList, likeMeme } from '../../../API/memesAPI'
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

export const fetchMemeList = createAsyncThunk(
  'fetchMemeList',
  async (page: number = 1) => {
    return getMemeList(page)
  },
)

export const fetchLikeMeme = createAsyncThunk(
  'fetchLikeMeme',
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
      .addCase(fetchLikeMeme.rejected, (state) => {
        state.IFetchingStatus = IFetchingStatus.rejected
      })
      .addCase(upload.pending, () => {})
      .addCase(upload.fulfilled, (state) => {
        console.log('success')

        state.IFetchingStatus = IFetchingStatus.fulfilled
      })
      .addCase(upload.rejected, () => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data.user
      })
  },
})

export default app.reducer
