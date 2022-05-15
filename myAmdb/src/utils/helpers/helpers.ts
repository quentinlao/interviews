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
