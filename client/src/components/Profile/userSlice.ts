import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { getUserMemes } from 'API/memesAPI'
import { getUser } from 'API/userApi'

import { IFetchingStatus } from 'constants/enums'
import { IMeme } from 'constants/interfaces'
import { errorNotificate } from 'utils/errorNotificate'

export interface UserState {
  // TODO добавить IUser
  currentUser: any
  userMemes: Array<IMeme>
  totalUserMemesCount: number
  fetchingStatus: IFetchingStatus
  error: any
}

const initialState: UserState = {
  currentUser: {},
  userMemes: [],
  totalUserMemesCount: 0,
  fetchingStatus: IFetchingStatus.idle,
  error: null,
}

export const fetchUserMemes = createAsyncThunk('fetchUserMemes', async (_, { rejectWithValue }) => {
  try {
    return await getUserMemes()
  } catch (error) {
    if (axios.isAxiosError(error)) errorNotificate(error)
    return rejectWithValue(error)
  }
})
export const fetchUser = createAsyncThunk('fetchUser', async (_, { rejectWithValue }) => {
  try {
    return await getUser()
  } catch (error) {
    if (axios.isAxiosError(error)) errorNotificate(error)
    return rejectWithValue(error)
  }
})

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data.user
      })
      .addCase(fetchUserMemes.fulfilled, (state, action) => {
        state.userMemes = action.payload.data.memes
        // TODO мб лучше вынести тотал в самого юзера, подумать как лучше сделать
        state.totalUserMemesCount = action.payload.data.total
      })
  },
})

const { reducer } = user

export { reducer as user }
