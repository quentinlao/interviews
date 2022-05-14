import { IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { Input } from '@mui/material';
import { IMovie } from '../../types';
import InfoIcon from '@mui/icons-material/Info';
import { URL_IMAGE } from '../../utils/constants/constants';
import { useAppSelector } from '../../hooks/hooks';

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

    const [searchParams, setSearchParams] = useSearchParams({ replace: true });

    return (
        <>
            <Typography variant="h3" gutterBottom component="div">
                Films
            </Typography>
            <Input
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
            <Typography variant="h2" gutterBottom component="div">
                Resultats
            </Typography>
            <ImageList sx={{ width: 1245, height: 450 }} cols={4} gap={6}>
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
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${movie.vote_count}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </QueryNavLink>
                            </ImageListItem>
                        ))}
                </>
            </ImageList>

            <Outlet />
        </>
    );
};
