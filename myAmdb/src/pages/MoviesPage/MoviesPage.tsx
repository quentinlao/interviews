import { IconButton, ImageList, ImageListItem, ImageListItemBar, InputBase, Paper, Typography } from '@mui/material';
import { NavLink, Outlet, URLSearchParamsInit, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { IMovie } from '../../types';
import { URL_IMAGE } from '../../utils/constants/constants';
import { useAppSelector } from '../../hooks/hooks';
import { ContentBar } from '../../components/contentBar/contentBar';
import { Section } from '../../components/section/section';
import SearchIcon from '@mui/icons-material/Search';
import { Star } from '@mui/icons-material';
import React from 'react';

/**
 * interface QueryNavLinkProps
 * key      - key react
 * to       - destination route
 * children - react children node
 */
interface IQueryNavLinkProps {
    key: number;
    to: string;
    children: React.ReactNode;
}
/**
 * Query nav link component to create navLink on click
 * @param props interface QueryNavLinkProps
 * @returns Query nav link component
 */
function QueryNavLink(props: IQueryNavLinkProps) {
    let location = useLocation();

    return (
        <NavLink key={props.key} to={props.to + location.search}>
            {props.children}
        </NavLink>
    );
}

/**
 * Movies page component with all movies from movie store
 * @returns Movies page component
 */
export const MoviesPage = (): JSX.Element => {
    // redux store movie
    const movies = useAppSelector((state) => state.movie);
    const myMovies = movies?.results;
    // display movies or detail
    const params = useParams();
    const movieId = params.movieId !== undefined ? Number(params.movieId) : undefined;
    const [showMovieDetail, setShowMovieDetail] = React.useState(false);
    // filter search movies params on filter value
    const [searchParams, setSearchParams] = useSearchParams({ replace: true });

    // listener movieId defined display detail or movies
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
                        <Typography data-test-id="moviesTitleId" variant="h2" gutterBottom component="div">
                            Tous les films
                        </Typography>
                        <SearchMovie searchParams={searchParams} setSearchParams={setSearchParams} />
                        <ImageList data-test-id={`moviesListId`} sx={{ width: 1245 }} cols={4} gap={6}>
                            <>
                                {myMovies
                                    ?.filter((movie: IMovie) => {
                                        const filter = searchParams.get('filter');
                                        if (!filter) return true;
                                        let name = movie.name.toLowerCase();
                                        return name.startsWith(filter.toLowerCase());
                                    })
                                    .map((movie: IMovie, index: number) => (
                                        <ImageListItem data-test-id={`movie${index}`} key={movie.id}>
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

/**
 * Interface SearchMovie
 * searchParams         - react router search param on url
 * setSearchParams      - callback to set searchParams
 */
interface ISearchMovie {
    searchParams: URLSearchParams;
    setSearchParams: (
        nextInit: URLSearchParamsInit,
        navigateOptions?:
            | {
                  replace?: boolean | undefined;
                  state?: any;
              }
            | undefined
    ) => void;
}

/**
 * Component to search movie
 * @param props Interface SearchMovie
 * @returns search movie component
 */
const SearchMovie = (props: ISearchMovie): JSX.Element => {
    const { searchParams, setSearchParams } = props;
    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
            <InputBase
                data-test-id="searchMovieId"
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
    );
};
