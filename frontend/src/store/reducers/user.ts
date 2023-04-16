import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';

export interface UserState {
    user: string,
    isLoading: boolean,
    error: string
}

const initialState: UserState = {
    user: '',
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginInit: (state) => {
            state.user = '';
            state.isLoading = true;
            state.error = '';
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = '';
        },
        loginFail: (state, action) => {
            state.user = '';
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginInit, loginSuccess, loginFail } = userSlice.actions

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer