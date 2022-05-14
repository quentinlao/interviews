import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseAmdb } from 'src/types';
import type { RootState } from '../store';

// Define the initial state using that type
const initialState: IResponseAmdb = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

/**
 * create RTK slice movie
 */
export const movieSlice = createSlice({
    name: 'movie',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setStoreByData: (state: IResponseAmdb, action: PayloadAction<IResponseAmdb>) => {
            state = action.payload;
            return state;
        },
    },
});

export const { setStoreByData } = movieSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const movie = (state: RootState) => state.movie;

export default movieSlice.reducer;
