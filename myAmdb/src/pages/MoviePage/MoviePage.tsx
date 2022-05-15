import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { findMovieById } from '../../utils/helpers/helpers';
import { useAppSelector } from '../../hooks/hooks';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { URL_IMAGE } from '../../utils/constants/constants';

/**
 * Movie page detail
 * @returns Movie page
 */
export const MoviePage = (): JSX.Element => {
    // router params url
    const params = useParams();
    // define movieId
    const movieId = params.movieId !== undefined ? Number(params.movieId) : 0;
    // redux fetch data movie store
    const movies = useAppSelector((state) => state.movie);
    const myMovies = movies?.results;
    // find specific movie by ID
    const movie = findMovieById(myMovies, movieId);
    // router to navigate
    let navigate = useNavigate();
    return (
        <>
            <Typography data-test-id="movieFoundId" variant="h2" gutterBottom component="div">
                <ArrowBackIosIcon
                    data-test-id="returnMovieId"
                    fontSize="large"
                    onClick={() => {
                        navigate('/movies');
                    }}
                />
                Selection de film : {movie && movie.name}
            </Typography>
            <Card sx={{ display: 'flex' }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardMedia component="img" height="600" image={`${URL_IMAGE}${movie?.poster_path}`} />
                    <CardContent sx={{ width: 10000 }}>
                        <Typography data-test-id="movieLabelTitleId" gutterBottom variant="h3" component="div">
                            Titre du film : {movie?.name}
                        </Typography>
                        <Typography data-test-id="movieLabelNameId" gutterBottom variant="h5" component="div">
                            Nom d'origine : {movie?.original_name}
                        </Typography>

                        <Typography
                            data-test-id="movieLabelOverviewId"
                            variant="body1"
                            color="text.secondary"
                            component="p"
                        >
                            Résumé : {movie?.overview}
                        </Typography>
                        <Typography data-test-id="movieLabelDateId" variant="h6" color="text.secondary">
                            Date de parution : {movie?.first_air_date}
                        </Typography>
                        <Typography data-test-id="movieLabelLangueId" variant="h6" color="text.secondary">
                            Langue : {movie?.original_language}
                        </Typography>
                        <Typography data-test-id="movieLabelPopularId" variant="h6" color="text.secondary">
                            Popularité : {movie?.popularity}
                        </Typography>
                        <Typography data-test-id="movieLabelVoteId" variant="h6" color="text.secondary">
                            Nombre de votes : {movie?.vote_count} / Moyenne ({movie?.vote_average})
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};
