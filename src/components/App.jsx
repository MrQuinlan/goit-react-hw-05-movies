import React from 'react';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Container from './Container';
import NavBar from './NavBar';

import getFilms from '../services/films-api';
// import HomePage from './HomePage';
// import SearchBar from './SearchBar';
// import MoviesPage from './MoviesPage';
// import FilmPage from './FilmPage';
// import Cast from './Cast';
// import Reviews from './Reviews';
// import Loader from './Loader';

const HomePage = lazy(() =>
    import('./HomePage' /* webpackChunkName: "HomePage" */)
);

const SearchBar = lazy(() =>
    import('./SearchBar' /* webpackChunkName: "SearchBar" */)
);

const MoviesPage = lazy(() =>
    import('./MoviesPage' /* webpackChunkName: "MoviesPage" */)
);

const FilmPage = lazy(() =>
    import('./FilmPage' /* webpackChunkName: "FilmPage" */)
);

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "Cast" */));

const Reviews = lazy(() =>
    import('./Reviews' /* webpackChunkName: "Reviews" */)
);

const Loader = lazy(() => import('./Loader' /* webpackChunkName: "Loader" */));

export const App = () => {
    const [query, setQuery] = useState('');
    const [films, setFilms] = useState([]);
    const [historyLocation, setHistoryLocation] = useState('');

    useEffect(() => {
        if (!query) {
            return;
        }

        getFilms('search/movie', query).then(res => {
            setFilms(res.results);
        });
    }, [query]);

    function onSetHistory(val) {
        setHistoryLocation(val);
    }

    function onSubmit(val) {
        if (!val) {
            return;
        }

        if (query === val) {
            return;
        }

        setQuery(val);
    }

    return (
        <Container>
            <NavBar />

            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<HomePage onSetHistory={onSetHistory} />}
                    />
                    <Route
                        path="/movies"
                        element={<SearchBar onSubmit={onSubmit} />}
                    >
                        <Route
                            path="q=:searchQuery"
                            element={
                                <MoviesPage
                                    onSetHistory={onSetHistory}
                                    films={films}
                                />
                            }
                        />
                    </Route>

                    <Route
                        path="/movies/:filmId"
                        element={<FilmPage historyLocation={historyLocation} />}
                    >
                        <Route path="/movies/:filmId/cast" element={<Cast />} />
                        <Route
                            path="/movies/:filmId/review"
                            element={<Reviews />}
                        />
                    </Route>
                </Routes>
            </Suspense>
        </Container>
    );
};
