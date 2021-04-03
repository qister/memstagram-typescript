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

export const register = createAsyncThunk(
  'register',
  (credentials: ICredentials) => {
    return fetchRegistration(credentials)
  },
)

const registration = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.fetchingStatus = IFetchingStatus.pending
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.fetchingStatus = IFetchingStatus.fulfilled
      // TODO: тут надо сделать переадресацию на страницу логина
    })
    builder.addCase(register.rejected, (state, action) => {
      state.fetchingStatus = IFetchingStatus.rejected
      state.error = action.error
    })
  },
})

const { reducer } = registration

export { reducer as regReducer }
