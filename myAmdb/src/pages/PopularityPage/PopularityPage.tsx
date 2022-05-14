import { Typography } from '@mui/material';
import { IMovie } from '../../types';
import { URL_IMAGE } from '../../utils/constants/constants';
import { SliderView } from '../../components/SliderView/SliderView';
import { useAppSelector } from '../../hooks/hooks';

export const PopularityPage = (): JSX.Element => {
    const movies = useAppSelector((state) => state.movie);
    const myMovies = movies?.results;
    const ImageData =
        myMovies !== undefined ? myMovies.map((movie: IMovie) => ({ image: `${URL_IMAGE}${movie.poster_path}` })) : [];

    return (
        <>
            <Typography variant="h3" gutterBottom component="div">
                Film populaire
            </Typography>
            <SliderView slides={ImageData} />
        </>
    );
};
