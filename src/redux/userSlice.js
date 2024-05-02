import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
    },
    reducers: {
        loginSuccess: (state) => {
            state.loggedIn = true
        },
    },
})

export const {
    loginSuccess,
} = userSlice.actions

export const selectLoggedIn = (state) => state.user.loggedIn

export default userSlice.reducer