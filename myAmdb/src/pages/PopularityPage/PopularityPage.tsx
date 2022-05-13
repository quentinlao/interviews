import MovieService from '../../api/movie.service';
import { useQuery } from 'react-query';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { IMovie, IResponseAmdb } from '../../types';
import { URL_IMAGE } from '../../utils/constants/constants';
import { SliderView } from '../../components/SliderView/SliderView';

export const PopularityPage = (): JSX.Element => {
    // Queries
    const {
        isLoading: isLoadingMovies,
        isError: isErrorMovies,
        data: movies,
        error: errorMovies,
    } = useQuery<IResponseAmdb, Error>('movies', async () => MovieService.getDiscover());

    if (isLoadingMovies) {
        return <span>Loading...</span>;
    }
    if (isErrorMovies) {
        return <span>Error: {errorMovies.message}</span>;
    }
    const myMovies = movies?.results;
    const ImageData =
        myMovies !== undefined ? myMovies.map((movie: IMovie) => ({ image: `${URL_IMAGE}${movie.poster_path}` })) : [];

    return (
        <>
            <Typography variant="h3" gutterBottom component="div">
                Film populaire
            </Typography>
            <SliderView slides={ImageData} />
            {/* <ImageList variant="masonry" cols={3} gap={8}>
                {myMovies !== undefined &&
                    myMovies.map((movie: IMovie) => (
                        <ImageListItem key={`imageList${movie.id}`}>
                            <img
                                src={`${URL_IMAGE}${movie.poster_path}`}
                                srcSet={`${URL_IMAGE}${movie.poster_path}`}
                                alt={movie.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
            </ImageList> */}
        </>
    );
};
