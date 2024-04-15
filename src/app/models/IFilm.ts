import { IGenres } from "./IGenres";
import { ITags } from "./ITags";

export interface IProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface IProductionCountry {
    name: string;
}

export interface IDirector {
    id: string;
    name: string;
    url: string;
    photo: string;
}

export interface IActor {
    id: string;
    name: string;
    url: string;
    photo: string;
    character: string;
}

export interface IFilm {
    id: number;
    title: string;
    overview: string;
    poster: string;
    release: string;
    video: string;
    rating: number;
    budget: number;
    production_companies: number[];
    production_countries: number[];
    genres: IGenres;
    tags: ITags;
    director: IDirector;
    actors: IActor[];
}