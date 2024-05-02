import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from './redux/api'
import userReducer from './redux/userSlice'

export default configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(baseApi.middleware)
    },
})