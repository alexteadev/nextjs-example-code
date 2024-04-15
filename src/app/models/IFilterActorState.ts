export interface IFilterActorState {
    count: number[];
    rating: number[];
    page: number;
    sortBy: 'rating' | 'count'; 
    direction: 'asc' | 'desc';
}