import { ISortFilmState } from '@/app/models/ISortFilmState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ISortFilmState = {
    sortBy: 'rating',
    direction: 'asc'
};

export const filmSortDirectorSlice = createSlice({
    name: 'filmsort',
    initialState,
    reducers: {
        setSortBy: (state, action: PayloadAction<'rating' | 'year'>) => {
            state.sortBy = action.payload;
            localStorage.setItem('sortby-director-film', action.payload);
        },
        setDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.direction = action.payload;
            localStorage.setItem('direction-director-film', action.payload);
        },
    },
});

export const { setSortBy, setDirection } = filmSortDirectorSlice.actions;
export default filmSortDirectorSlice.reducer;