import { Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { PopularityPage } from '../PopularityPage/PopularityPage';

export const HomePage = (): JSX.Element => {
    return (
        <>
            <Typography variant="h2" gutterBottom component="div">
                <Link to="/">My Amdb</Link>
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                <Link to="/popularity">Populaires</Link> <Link to="/movies">Tous les films</Link>
            </Typography>
            <Outlet />
        </>
    );
};
