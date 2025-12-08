import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'

// todo: adding listeners - saving theme, saving login session, saving user's preference.

const store = configureStore({
    reducer:{
auth: authSlice
    }
});

export default store;   