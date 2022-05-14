import { Typography } from '@mui/material';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { findMovieById } from '../../utils/helpers/helpers';
import { useAppSelector } from '../../hooks/hooks';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ContentBar } from '../../components/contentBar/contentBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { URL_IMAGE } from '../../utils/constants/constants';

export const MoviePage = (): JSX.Element => {
    const params = useParams();
    const movieId = params.movieId !== undefined ? Number(params.movieId) : 0;
    const movies = useAppSelector((state) => state.movie);
    const myMovies = movies?.results;
    const movie = findMovieById(myMovies, movieId);
    let navigate = useNavigate();
    return (
        <>
            <Typography variant="h2" gutterBottom component="div">
                <ArrowBackIosIcon
                    fontSize="large"
                    onClick={() => {
                        navigate('/movies');
                    }}
                />
                Selected {movie && movie.name}
            </Typography>
            <Card sx={{ display: 'flex' }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardMedia component="img" height="600" image={`${URL_IMAGE}${movie?.poster_path}`} />
                    <CardContent sx={{ width: 10000 }}>
                        <Typography gutterBottom variant="h3" component="div">
                            Titre du film : {movie?.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Nom d'origine : {movie?.original_name}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" component="p">
                            Résumé : {movie?.overview}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Date de parution : {movie?.first_air_date}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Langue : {movie?.original_language}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Popularité : {movie?.popularity}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Nombre de votes : {movie?.vote_count} / Moyenne ({movie?.vote_average})
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};
