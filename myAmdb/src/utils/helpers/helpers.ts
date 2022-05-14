import { IMovie } from '../../types';

export const findMovieById = (movies: IMovie[], id: number): IMovie | undefined => {
    let result = undefined;
    if (movies.length > 0) {
        result = movies.find((movie: IMovie) => movie.id === id);
    }
    return result;
};
