import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';
import { User } from '../../common/types';

export interface UserState {
    user: User,
    error: string,
    isLoading: boolean
}

const EMPTY_USER = { userId: '', userName: '', token: '' };

const initialState: UserState = {
    user: EMPTY_USER,
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginInit: (state) => {
            state.user = EMPTY_USER;
            state.isLoading = true;
            state.error = '';
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = '';
        },
        loginFail: (state, action) => {
            state.user = EMPTY_USER;
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginInit, loginSuccess, loginFail } = userSlice.actions

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer