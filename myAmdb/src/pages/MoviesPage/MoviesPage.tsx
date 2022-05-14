import { IconButton, ImageList, ImageListItem, ImageListItemBar, InputBase, Paper, Typography } from '@mui/material';
import { NavLink, Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IMovie } from '../../types';
import { URL_IMAGE } from '../../utils/constants/constants';
import { useAppSelector } from '../../hooks/hooks';
import { ContentBar } from '../../components/contentBar/contentBar';
import { Section } from '../../components/section/Section';
import SearchIcon from '@mui/icons-material/Search';
import { Star } from '@mui/icons-material';
import React from 'react';

interface IQueryNavLinkProps {
    key: number;
    to: string;
    children: React.ReactNode;
}
function QueryNavLink(props: IQueryNavLinkProps) {
    let location = useLocation();

    return (
        <NavLink key={props.key} to={props.to + location.search}>
            {props.children}
        </NavLink>
    );
}

export const MoviesPage = (): JSX.Element => {
    const movies = useAppSelector((state) => state.movie);
    const myMovies = movies?.results;
    const params = useParams();
    const movieId = params.movieId !== undefined ? Number(params.movieId) : undefined;
    const [showMovieDetail, setShowMovieDetail] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams({ replace: true });
    React.useEffect(() => {
        if (movieId !== undefined) {
            setShowMovieDetail(true);
        } else {
            setShowMovieDetail(false);
        }
    }, [movieId]);
    return (
        <ContentBar>
            <Section flexDirection="column">
                {showMovieDetail ? (
                    <Outlet />
                ) : (
                    <>
                        <Typography variant="h2" gutterBottom component="div">
                            Tous les films
                        </Typography>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Rerchercher un film"
                                value={searchParams.get('filter') || ''}
                                onChange={(event) => {
                                    let filter = event.target.value;
                                    if (filter) {
                                        setSearchParams({ filter }, { replace: true });
                                    } else {
                                        setSearchParams({}, { replace: true });
                                    }
                                }}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <ImageList sx={{ width: 1245 }} cols={4} gap={6}>
                            <>
                                {myMovies
                                    ?.filter((movie: IMovie) => {
                                        const filter = searchParams.get('filter');
                                        if (!filter) return true;
                                        let name = movie.name.toLowerCase();
                                        return name.startsWith(filter.toLowerCase());
                                    })
                                    .map((movie: IMovie) => (
                                        <ImageListItem key={movie.id}>
                                            <QueryNavLink key={movie.id} to={`/movies/${movie.id}`}>
                                                <img
                                                    src={`${URL_IMAGE}${movie.poster_path}`}
                                                    srcSet={`${URL_IMAGE}${movie.poster_path}`}
                                                    alt={movie.name}
                                                    loading="lazy"
                                                    style={{ width: 300 }}
                                                />
                                                <ImageListItemBar
                                                    title={movie.name}
                                                    subtitle={movie.overview}
                                                    sx={{ width: 300 }}
                                                    actionIcon={
                                                        <IconButton
                                                            sx={{ color: 'yellow' }}
                                                            aria-label={`info about ${movie.vote_count}`}
                                                        >
                                                            {movie.vote_count}
                                                            <Star />
                                                        </IconButton>
                                                    }
                                                />
                                            </QueryNavLink>
                                        </ImageListItem>
                                    ))}
                            </>
                        </ImageList>
                    </>
                )}
            </Section>
        </ContentBar>
    );
};
