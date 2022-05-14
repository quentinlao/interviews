import { Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import { IResponseAmdb } from '../../types';
import MovieService from '../../api/movie.service';
import { useAppDispatch } from '../../hooks/hooks';
import { setStoreByData } from '../../api/movie.slice';

export const HomePage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    // Queries only once data (queries client config) and set storage with value fetch
    const { data: movies } = useQuery<IResponseAmdb, Error>('movies', async () => MovieService.getDiscover(), {
        onSuccess: (res: IResponseAmdb) => {
            dispatch(setStoreByData(res));
        },
    });

    // outlet parent route for nest app route
    return (
        <>
            <Typography variant="h2" gutterBottom component="div">
                <Link to="/">My Amdb</Link>
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                <nav>
                    <Link to="/popularity">Populaires</Link> <Link to="/movies">Tous les films</Link>
                </nav>
            </Typography>
            <Outlet />
        </>
    );
};
