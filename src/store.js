import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from './redux/api'

export default configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(baseApi.middleware)
    },
})