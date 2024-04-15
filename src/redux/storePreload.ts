export const preloadedState = () => {
    if (typeof window !== "undefined") {
        const savedGenre = localStorage.getItem('genre-filter');
        const savedSubgenre = localStorage.getItem('subgenre-filter');
        const savedTags = localStorage.getItem('tags-filter');
        const savedType = localStorage.getItem('type-filter');
        const savedRating = localStorage.getItem('rating-filter');
        const savedReleaseYear = localStorage.getItem('release-year-filter');
        const savedEventEra = localStorage.getItem('event-era-filter');
        const savedCountry = localStorage.getItem('country-filter');
        const savedAgeRating = localStorage.getItem('age-rating-filter');
        const savedAwards = localStorage.getItem('awards-filter');
        const savedPage = localStorage.getItem('page-filter');
        return {
            filter: {
                genre: savedGenre ? JSON.parse(savedGenre) : [],
                subgenre: savedSubgenre ? JSON.parse(savedSubgenre) : [],
                tags: savedTags ? JSON.parse(savedTags) : [],
                type: savedType !== null ? JSON.parse(savedType) : true,
                rating: savedRating ? JSON.parse(savedRating) : [],
                release_year: savedReleaseYear ? JSON.parse(savedReleaseYear) : [],
                event_era: savedEventEra ? JSON.parse(savedEventEra) : [],
                country: savedCountry ? JSON.parse(savedCountry) : [],
                age_rating: savedAgeRating ? JSON.parse(savedAgeRating) : [],
                awards: savedAwards ? JSON.parse(savedAwards) : [],
                page: savedPage ? JSON.parse(savedPage) : 1,
            },
        };
    } else {
        return {
            filter: {
                genre: [],
                subgenre: [],
                tags: [],
                type: 'init',
                rating: [],
                release_year: [],
                event_era: [],
                country: [],
                age_rating: [],
                awards: [],
                page: 1,
            },
        };
    }
};