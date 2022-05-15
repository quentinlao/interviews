import { IMovie } from '../../types';

/**
 * function find movie by id
 * @param movies list of movies
 * @param id movie id
 * @returns movie found
 */
export const findMovieById = (movies: IMovie[], id: number): IMovie | undefined => {
    let result = undefined;
    if (movies.length > 0) {
        result = movies.find((movie: IMovie) => movie.id === id);
    }
    return result;
};

export const addMovies = (movies1: IMovie[], movies2: IMovie[]): IMovie[] => {
    const movies = new Set(movies1);
    movies2.forEach((movie2: IMovie) => movies.add(movie2));
    return [...movies];
};
