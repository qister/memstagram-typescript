import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authLoginFetch } from '../../../API/authApi';

export type credentials = {
    email: string
    password: string
}

export enum FetchingStatus {
    idle = 'idle',
    pending = 'pending',
    fulfilled = 'fulfilled',
    rejected = 'rejected',
}

export interface AuthorizationState {
    token: string,
    userId: string,
    email: string,
    isAuthenticated: boolean,
    FetchingStatus: FetchingStatus
}

const initialState: AuthorizationState = {
    token: '',
    userId: '',
    email: '',
    isAuthenticated: false,
    FetchingStatus: FetchingStatus.idle
}

export const authLogin = createAsyncThunk(
    'authLogin',
    (credentials: credentials) => {
        return authLoginFetch(credentials)
    }
)

const authorization = createSlice({
    name: 'authorization',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authLogin.pending, state => {
            state.FetchingStatus = FetchingStatus.pending
        })
        builder.addCase(authLogin.fulfilled, (state, action) => {
            state.FetchingStatus = FetchingStatus.fulfilled
            state.token = action.payload.token
            state.userId = action.payload.userId
            state.email = action.payload.email
            state.isAuthenticated = true
        })
        builder.addCase(authLogin.rejected, state => {
            state.FetchingStatus = FetchingStatus.rejected
        })
    }
})

export default authorization.reducer
