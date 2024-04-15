export interface ICountry {
    [key: string]: number;
}

export interface IRegion {
    id: number;
    countries: ICountry;
}

export interface IContinent {
    id: number;
    regions: { [key: string]: IRegion };
}

export interface IWorldRegions {
    [key: string]: IContinent;
}