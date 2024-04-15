import { ISortMyListState } from '@/app/models/ISortMyListState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ISortMyListState = {
    type: 'init',
    sortBy: 'rating',
    direction: 'asc',
    page: 1,
};

export const filmSortMyList = createSlice({
    name: 'mylistsort',
    initialState,
    reducers: {
        setType: (state, action: PayloadAction<'film' | 'series'>) => {
            state.type = action.payload;
            state.page = 1;
            localStorage.setItem('type-mylist', action.payload);
        },
        setSortBy: (state, action: PayloadAction<'rating' | 'year'>) => {
            state.sortBy = action.payload;
            state.page = 1;
            localStorage.setItem('sortby-mylist', action.payload);
        },
        setDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.direction = action.payload;
            state.page = 1;
            localStorage.setItem('direction-mylist', action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
});

export const { setSortBy, setDirection, setType } = filmSortMyList.actions;
export default filmSortMyList.reducer;