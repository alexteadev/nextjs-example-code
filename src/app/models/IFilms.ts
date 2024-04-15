import { IGenres } from "./IGenres";

export interface IFilmList {
    title: string;
    year: string;
    genre: IGenres;
    poster: string;
    rating: number;
    url: string;
}

export interface IFilms {
    [key: number]: IFilmList;
}