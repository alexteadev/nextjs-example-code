import { IFilterDirectorState } from '@/app/models/IFilterDirectorState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IFilterDirectorState = {
    count: [],
    rating: [],
    page: 1,
    sortBy: 'rating',
    direction: 'asc'
};

export const directorsFilterSlice = createSlice({
    name: 'directorsfilter',
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number[]>) => {
            state.count = action.payload;
            state.page = 1;
            localStorage.setItem('count-d-filter', JSON.stringify(action.payload));
        },
        setRating: (state, action: PayloadAction<number[]>) => {
            state.rating = action.payload;
            state.page = 1;
            localStorage.setItem('rating-d-filter', JSON.stringify(action.payload));
        },
        setSortBy: (state, action: PayloadAction<'rating' | 'count'>) => {
            state.sortBy = action.payload;
            state.page = 1;
            localStorage.setItem('sortby-d-filter', action.payload);
        },
        setDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.direction = action.payload;
            state.page = 1;
            localStorage.setItem('direction-d-filter', action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
});

export const { 
    setCount, setSortBy, setDirection, setRating, setPage 
  } = directorsFilterSlice.actions;
export default directorsFilterSlice.reducer;