import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import deleteReducer from './features/deleteSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        update: deleteReducer
    }
})