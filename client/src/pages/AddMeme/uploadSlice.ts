import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { IFetchingStatus } from 'constants/enums'
import { uploadMeme } from 'API/memesAPI'

import './AddMeme.scss'
import { errorNotificate } from 'utils/errorNotificate'

export interface UploadState {
  fetchingStatus: IFetchingStatus
}

const initialState: UploadState = {
  fetchingStatus: IFetchingStatus.idle,
}

export const fetchUploadMemes = createAsyncThunk(
  'upload',
  async (data: any, { rejectWithValue }) => {
    try {
      return await uploadMeme(data)
    } catch (error) {
      if (axios.isAxiosError(error)) errorNotificate(error)
      return rejectWithValue(error)
    }
  },
)

const upload = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploadMemes.pending, () => {})
      .addCase(fetchUploadMemes.fulfilled, (state) => {
        state.fetchingStatus = IFetchingStatus.fulfilled
      })
  },
})

const {
  reducer,
  actions: { reset },
} = upload

export { reducer as upload }
export { reset as resetUploadState }
