import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    setGenre,
    setSubgenre,
    setTags,
    setType,
    setRating,
    setYear,
    setEventEra,
    setCountries,
    setAgeRating,
    setAwards,
    setPage
} from '@/redux/slices/filterSlice';

export const useHydrateStore = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const savedGenre = localStorage.getItem('genre-filter');
        const savedSubgenre = localStorage.getItem('subgenre-filter');
        const savedTags = localStorage.getItem('tags-filter');
        const savedType = localStorage.getItem('type-filter');
        const savedRating = localStorage.getItem('rating-filter');
        const savedReleaseYear = localStorage.getItem('year-filter');
        const savedEventEra = localStorage.getItem('event-era-filter');
        const savedCountry = localStorage.getItem('country-filter');
        const savedAgeRating = localStorage.getItem('age-rating-filter');
        const savedAwards = localStorage.getItem('awards-filter');
        const savedPage = localStorage.getItem('page-filter');

        dispatch(setGenre(savedGenre ? JSON.parse(savedGenre) : []));
        dispatch(setSubgenre(savedSubgenre ? JSON.parse(savedSubgenre) : []));
        dispatch(setTags(savedTags ? JSON.parse(savedTags) : []));
        dispatch(setType(savedType !== null ? JSON.parse(savedType) : true));
        dispatch(setRating(savedRating ? JSON.parse(savedRating) : []));
        dispatch(setYear(savedReleaseYear ? JSON.parse(savedReleaseYear) : []));
        dispatch(setEventEra(savedEventEra ? JSON.parse(savedEventEra) : []));
        dispatch(setCountries(savedCountry ? JSON.parse(savedCountry) : []));
        dispatch(setAgeRating(savedAgeRating ? JSON.parse(savedAgeRating) : []));
        dispatch(setAwards(savedAwards ? JSON.parse(savedAwards) : []));
        dispatch(setPage(savedPage ? JSON.parse(savedPage) : 1));
    }, [dispatch]);
};
