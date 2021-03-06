/**
 * interface server response API discover
 */
export interface IResponseAmdb {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

/**
 * Interface movie model
 */
export interface IMovie {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}
