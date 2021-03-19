import { useHistory } from 'react-router-dom'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchRegistration } from 'API/regApi'
import { IFetchingStatus } from 'constants/enums'

export interface ICredentials {
  email: string
  password: string
}

export interface IRegistrationState {
  fetchingStatus: IFetchingStatus
  error?: any
}

const initialState: IRegistrationState = {
  fetchingStatus: IFetchingStatus.idle,
}

export const registrate = createAsyncThunk(
  'registrate',
  (credentials: ICredentials) => {
    return fetchRegistration(credentials)
  },
)

const registration = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registrate.pending, (state) => {
      state.fetchingStatus = IFetchingStatus.pending
    })
    builder.addCase(registrate.fulfilled, (state, action) => {
      state.fetchingStatus = IFetchingStatus.fulfilled
      // TODO: тут надо сделать переадресацию на страницу логина
    })
    builder.addCase(registrate.rejected, (state, action) => {
      state.fetchingStatus = IFetchingStatus.rejected
      state.error = action.error
    })
  },
})

const { reducer } = registration

export { reducer as regReducer }
