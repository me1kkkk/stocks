import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './tokenReducer';

const store = configureStore({
    reducer: {
        token: tokenSlice.reducer,
    },
});

export default store;
