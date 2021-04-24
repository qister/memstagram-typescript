import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IFetchingStatus } from 'constants/enums'
import { uploadMeme } from 'API/memesAPI'

export interface AppState {
  fetchingStatus: IFetchingStatus
}

const initialState: AppState = {
  fetchingStatus: IFetchingStatus.idle,
}

export const fetchUploadMemes = createAsyncThunk('upload', (data: any) => uploadMeme(data))

const upload = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploadMemes.pending, () => {})
      .addCase(fetchUploadMemes.fulfilled, (state) => {
        state.fetchingStatus = IFetchingStatus.fulfilled
      })
      .addCase(fetchUploadMemes.rejected, () => {})
  },
})

const { reducer } = upload

export { reducer as upload }
