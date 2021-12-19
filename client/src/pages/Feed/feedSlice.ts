import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getMemeList, likeMeme } from 'API/memesAPI'
import { IFetchingStatus } from 'constants/enums'
import { IMeme } from 'constants/interfaces'
import { RootState } from 'redux/store'
import { errorNotificate } from 'utils/errorNotificate'

export interface FeedState {
  memeList: Array<IMeme>
  fetchingStatus: IFetchingStatus
  error?: any
  nextPage: number
  total: number
}

const initialState: FeedState = {
  memeList: [],
  fetchingStatus: IFetchingStatus.idle,
  nextPage: 1,
  total: 0,
}

export const fetchMemeList = createAsyncThunk(
  'fetchMemeList',
  async (_, { getState, rejectWithValue }) => {
    const {
      feed: { nextPage },
    } = getState() as RootState

    try {
      return await getMemeList(nextPage)
    } catch (error) {
      if (axios.isAxiosError(error)) errorNotificate(error)
      return rejectWithValue(error)
    }
  },
)

export const fetchLikeMeme = createAsyncThunk(
  'fetchLikeMeme',
  async ({ _id }: { _id: string }, { rejectWithValue }) => {
    try {
      return await likeMeme(_id)
    } catch (error) {
      if (axios.isAxiosError(error)) errorNotificate(error)
      return rejectWithValue(error)
    }
  },
)

const feed = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemeList.pending, (state) => {
        state.fetchingStatus = IFetchingStatus.pending
      })
      .addCase(fetchMemeList.fulfilled, (state, action) => {
        const { memes, total, next } = action.payload.data
        state.fetchingStatus = IFetchingStatus.fulfilled
        state.memeList = [...state.memeList, ...memes]
        state.total = total
        // TODO поправить пагинацию и убрать ? тк сейчас next.page приходит не всегда
        state.nextPage = next?.page
      })
      .addCase(fetchLikeMeme.pending, (state) => {
        state.fetchingStatus = IFetchingStatus.pending
      })
      .addCase(
        fetchLikeMeme.fulfilled,
        (
          state,
          {
            payload: {
              data: {
                meme: { _id },
              },
            },
          },
        ) => {
          state.fetchingStatus = IFetchingStatus.fulfilled
          state.memeList = state.memeList.map((meme) =>
            meme._id === _id ? { ...meme, liked: !meme.liked } : meme,
          )
        },
      )
  },
})

const {
  reducer,
  actions: { reset },
} = feed

export { reducer as feed, reset as resetFeedState }
