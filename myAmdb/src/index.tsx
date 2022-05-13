import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PopularityPage } from './pages/PopularityPage/PopularityPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MoviesPage } from './pages/MoviesPage/MoviesPage';
import { HomePage } from './pages/HomePage/HomePage';
import { MoviePage } from './pages/MoviePage/MoviePage';

// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route path="popularity" element={<PopularityPage />} />

                        <Route path="movies" element={<MoviesPage />}>
                            <Route
                                index
                                element={
                                    <main style={{ padding: '1rem' }}>
                                        <p>no result</p>
                                    </main>
                                }
                            />
                            <Route path=":movieId" element={<MoviePage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>,

    document.getElementById('app')
);
