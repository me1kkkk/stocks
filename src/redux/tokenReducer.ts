import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: '',
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});
export default tokenSlice;
