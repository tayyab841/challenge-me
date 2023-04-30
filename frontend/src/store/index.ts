import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/user'
import playersReducer from './reducers/players';

export const store = configureStore({
    reducer: {
        user: userReducer,
        players: playersReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch