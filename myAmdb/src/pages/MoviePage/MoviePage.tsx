import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { findMovieById } from '../../utils/helpers/helpers';
import { useAppSelector } from '../../hooks/hooks';

export const MoviePage = (): JSX.Element => {
    const params = useParams();
    const movieId = params.movieId !== undefined ? Number(params.movieId) : 0;
    const movies = useAppSelector((state) => state.movie);
    const myMovies = movies?.results;
    const movie = findMovieById(myMovies, movieId);
    return (
        <>
            <Typography variant="h2" gutterBottom component="div">
                Selected {movie && movie.name}
            </Typography>
        </>
    );
};
