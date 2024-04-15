export interface ISortMyListState {
    sortBy: 'rating' | 'year'; 
    direction: 'asc' | 'desc';
    type: 'film' | 'series' | 'init';
    page: number;
}