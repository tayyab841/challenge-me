import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '..';
import { PlayerChallenge } from '../../common/types';

export interface PlayersState {
    error: string,
    isLoading: boolean,
    players: PlayerChallenge[]
}

const initialState: PlayersState = {
    error: '',
    players: [],
    isLoading: false,
}

export const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        PlayersInit: (state) => {
            state.error = '';
            state.players = [];
            state.isLoading = true;
        },
        PlayersSuccess: (state, action) => {
            state.error = '';
            state.isLoading = false;
            state.players = action.payload;
        },
        PlayersFail: (state, action) => {
            state.players = [];
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { PlayersInit, PlayersSuccess, PlayersFail } = playersSlice.actions;

export const selectPlayers = (state: RootState) => state.players;

export default playersSlice.reducer;