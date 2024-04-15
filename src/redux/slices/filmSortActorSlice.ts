import { ISortFilmState } from '@/app/models/ISortFilmState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ISortFilmState = {
    sortBy: 'rating',
    direction: 'asc'
};

export const filmSortActorSlice = createSlice({
    name: 'filmsort',
    initialState,
    reducers: {
        setSortBy: (state, action: PayloadAction<'rating' | 'year'>) => {
            state.sortBy = action.payload;
            localStorage.setItem('sortby-actor-film', action.payload);
        },
        setDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.direction = action.payload;
            localStorage.setItem('direction-actor-film', action.payload);
        },
    },
});

export const { setSortBy, setDirection } = filmSortActorSlice.actions;
export default filmSortActorSlice.reducer;