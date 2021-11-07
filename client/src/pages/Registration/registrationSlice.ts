import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IFetchingStatus } from 'constants/enums'
import { getRegistration } from 'API/regApi'
import { errorNotificate } from 'utils/errorNotificate'
import { setLoginFormCredentials } from 'pages/Authorization/authSlice'
import { successNotificate } from 'utils/successNotificate'

export interface ICredentials {
  email: string
  password: string
  nickname?: string
}

export interface IRegistrationState {
  fetchingStatus: IFetchingStatus
}

const initialState: IRegistrationState = {
  fetchingStatus: IFetchingStatus.idle,
}

export const fetchRegistration = createAsyncThunk(
  'fetchRegistration',
  async (credentials: ICredentials, { rejectWithValue, dispatch }) => {
    try {
      await getRegistration(credentials)
      dispatch(setLoginFormCredentials(credentials))

      // setTimeout чтобы подождать пока реакт отрендерит форму логина и уже потом показать уведомление
      setTimeout(() => successNotificate('Вы зарегистрировались'), 0)
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
    builder.addCase(fetchRegistration.fulfilled, (state) => {
      state.fetchingStatus = IFetchingStatus.fulfilled
    })
  },
})

const {
  reducer,
  actions: { reset },
} = registration

export { reducer as registration, reset as resetRegistrationState }
