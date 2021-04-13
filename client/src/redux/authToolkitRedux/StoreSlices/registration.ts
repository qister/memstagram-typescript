import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRegistration } from 'API/regApi'
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

export const fetchRegistration = createAsyncThunk(
  'fetchRegistration',
  (credentials: ICredentials) => getRegistration(credentials),
)

const registration = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.pending, (state) => {
      state.fetchingStatus = IFetchingStatus.pending
    })
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.fetchingStatus = IFetchingStatus.fulfilled
      // TODO: тут надо сделать переадресацию на страницу логина
    })
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.fetchingStatus = IFetchingStatus.rejected
      state.error = action.error
    })
  },
})

const { reducer } = registration

export { reducer as registration }
