import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from '../features/authSice.js'

export const store = configureStore({
    reducer:{user:userSlice.reducer}
})