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
    error: '',
    user: EMPTY_USER,
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginInit: (state) => {
            state.error = '';
            state.isLoading = true;
            state.user = EMPTY_USER;
        },
        loginSuccess: (state, action) => {
            state.error = '';
            state.isLoading = false;
            state.user = action.payload;
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