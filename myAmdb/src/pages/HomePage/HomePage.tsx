import { Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { IResponseAmdb } from '../../types';
import MovieService from '../../api/movie.service';
import { useAppDispatch } from '../../hooks/hooks';
import { setStoreByData } from '../../api/movie.slice';
import { NavBar } from '../../components/navBar/navbar';
import logo from '../../assets/logoMyAmdb.png';
import styles from './homePage.module.css';
import { NavLinkView } from '../../components/navLinkView/navLinkView';
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
            <NavBar>
                <Typography variant="h2" gutterBottom component="div">
                    <Link to="/">
                        <div style={{ textAlign: 'center' }}>
                            <img src={logo} />
                        </div>
                    </Link>
                </Typography>
                <ul className={styles.homePageNav}>
                    <li>
                        <NavLinkView to="/popularity">Populaires</NavLinkView>
                    </li>
                    <li>
                        <NavLinkView to="/movies">Tous les films</NavLinkView>
                    </li>
                </ul>
            </NavBar>
            <Outlet />
        </>
    );
};
