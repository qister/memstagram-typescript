import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IFetchingStatus } from 'constants/enums'
import { getRegistration } from 'API/regApi'
import { errorNotificate } from 'utils/errorNotificate'

export interface ICredentials {
  email: string
  password: string
}

export interface IRegistrationState {
  fetchingStatus: IFetchingStatus
}

const initialState: IRegistrationState = {
  fetchingStatus: IFetchingStatus.idle,
}

export const fetchRegistration = createAsyncThunk(
  'fetchRegistration',
  async (credentials: ICredentials, { rejectWithValue }) => {
    try {
      return await getRegistration(credentials)
    } catch (error) {
      if (axios.isAxiosError(error)) errorNotificate(error)
      return rejectWithValue(error)
    }
  },
)

const registration = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.pending, (state) => {
      state.fetchingStatus = IFetchingStatus.pending
    })
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.fetchingStatus = IFetchingStatus.fulfilled
      // TODO: тут надо сделать переадресацию на страницу логина
    })
  },
})

const {
  reducer,
  actions: { reset },
} = registration

export { reducer as registration, reset as resetRegistrationState }
