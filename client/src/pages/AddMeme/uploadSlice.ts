import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IFetchingStatus } from 'constants/enums'
import { uploadMeme } from 'API/memesAPI'

import './AddMeme.scss'

export interface UploadState {
  fetchingStatus: IFetchingStatus
}

const initialState: UploadState = {
  fetchingStatus: IFetchingStatus.idle,
}

export const fetchUploadMemes = createAsyncThunk('upload', (data: any) => uploadMeme(data))

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
      .addCase(fetchUploadMemes.rejected, () => {})
  },
})

const {
  reducer,
  actions: { reset },
} = upload

export { reducer as upload }
export { reset as resetUploadState }
