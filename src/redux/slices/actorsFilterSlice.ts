import { IFilterActorState } from '@/app/models/IFilterActorState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IFilterActorState = {
    count: [],
    rating: [],
    page: 1,
    sortBy: 'rating',
    direction: 'asc'
};

export const actorsFilterSlice = createSlice({
    name: 'actorsfilter',
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number[]>) => {
            state.count = action.payload;
            state.page = 1;
            localStorage.setItem('count-a-filter', JSON.stringify(action.payload));
        },
        setRating: (state, action: PayloadAction<number[]>) => {
            state.rating = action.payload;
            state.page = 1;
            localStorage.setItem('rating-a-filter', JSON.stringify(action.payload));
        },
        setSortBy: (state, action: PayloadAction<'rating' | 'count'>) => {
            state.sortBy = action.payload;
            state.page = 1;
            localStorage.setItem('sortby-a-filter', action.payload);
        },
        setDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.direction = action.payload;
            state.page = 1;
            localStorage.setItem('direction-a-filter', action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
});

export const { 
    setCount, setSortBy, setDirection, setRating, setPage 
  } = actorsFilterSlice.actions;
export default actorsFilterSlice.reducer;