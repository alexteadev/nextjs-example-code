import { IFilterState } from '@/app/models/IFilterState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IFilterState = {
    genre: [],
    subgenre: [],
    tags: [],
    type: 'init',
    rating: [],
    year: [],
    event_era: [],
    country: [],
    age_rating: [],
    awards: [],
    page: 1,
    sortBy: 'rating',
    direction: 'asc'
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setGenre: (state, action: PayloadAction<number[]>) => {
            state.genre = action.payload;
            state.page = 1;
            localStorage.setItem('genre-filter', JSON.stringify(action.payload));
        },
        setSubgenre: (state, action: PayloadAction<number[]>) => {
            state.subgenre = action.payload;
            state.page = 1;
            localStorage.setItem('subgenre-filter', JSON.stringify(action.payload));
        },
        setTags: (state, action: PayloadAction<number[]>) => {
            state.tags = action.payload;
            state.page = 1;
            localStorage.setItem('tags-filter', JSON.stringify(action.payload));
        },
        setType: (state, action: PayloadAction<'film' | 'series'>) => {
            state.type = action.payload;
            state.page = 1;
            localStorage.setItem('type-filter', action.payload);
        },
        setRating: (state, action: PayloadAction<number[]>) => {
            state.rating = action.payload;
            state.page = 1;
            localStorage.setItem('rating-filter', JSON.stringify(action.payload));
        },
        setYear: (state, action: PayloadAction<number[]>) => {
            state.year = action.payload;
            state.page = 1;
            localStorage.setItem('year-filter', JSON.stringify(action.payload));
        },
        setEventEra: (state, action: PayloadAction<number[]>) => {
            state.event_era = action.payload;
            state.page = 1;
            localStorage.setItem('era-filter', JSON.stringify(action.payload));
        },
        setCountries: (state, action: PayloadAction<number[]>) => {
            state.country = action.payload;
            state.page = 1;
            localStorage.setItem('countries-filter', JSON.stringify(action.payload));
        },
        setAgeRating: (state, action: PayloadAction<number[]>) => {
            state.age_rating = action.payload;
            state.page = 1;
            localStorage.setItem('age-filter', JSON.stringify(action.payload));
        },
        setAwards: (state, action: PayloadAction<number[]>) => {
            state.awards = action.payload;
            state.page = 1;
            localStorage.setItem('awards-filter', JSON.stringify(action.payload));
        },
        setSortBy: (state, action: PayloadAction<'rating' | 'year'>) => {
            state.sortBy = action.payload;
            state.page = 1;
            localStorage.setItem('sortby-filter', action.payload);
        },
        setDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.direction = action.payload;
            state.page = 1;
            localStorage.setItem('direction-filter', action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
});

export const { 
    setGenre, setSubgenre, setTags, setType, setRating, setYear, 
    setEventEra, setCountries, setAgeRating, setAwards, setPage, 
    setSortBy, setDirection
  } = filterSlice.actions;
export default filterSlice.reducer;